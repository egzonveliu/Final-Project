import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CATEGORIES = ['Web', 'Mobile', 'Other']

export default function ProjectForm({ onSubmit, defaultValues, onCancel }) {
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: defaultValues || {
      title: '', description: '', tech: '', link: '',
      category: 'Web', featured: false, createdAt: new Date(),
    },
  })

  useEffect(() => {
    if (defaultValues) reset({
      ...defaultValues,
      tech: Array.isArray(defaultValues.tech) ? defaultValues.tech.join(', ') : defaultValues.tech,
      createdAt: defaultValues.createdAt ? new Date(defaultValues.createdAt) : new Date(),
    })
  }, [defaultValues, reset])

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      tech: data.tech.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: data.createdAt instanceof Date
        ? data.createdAt.toISOString().split('T')[0]
        : data.createdAt,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="label">Project Title *</label>
        <input
          {...register('title', { required: 'Titulli është i detyrueshëm', minLength: { value: 3, message: 'Minimum 3 karaktere' } })}
          placeholder="Portfolio Website"
          className="input"
        />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="label">Description *</label>
        <textarea
          {...register('description', { required: 'Përshkrimi është i detyrueshëm', minLength: { value: 10, message: 'Minimum 10 karaktere' } })}
          placeholder="Përshkruaj projektin..."
          rows={3}
          className="input resize-none"
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="label">Technologies * (ndaj me presje)</label>
        <input
          {...register('tech', { required: 'Shto të paktën një teknologji' })}
          placeholder="React.js, Tailwind CSS, Git"
          className="input"
        />
        {errors.tech && <p className="text-red-400 text-xs mt-1">{errors.tech.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Category *</label>
          <select {...register('category')} className="input">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Project Date *</label>
          <Controller
            name="createdAt"
            control={control}
            rules={{ required: 'Data është e detyrueshme' }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                placeholderText="Zgjidh datën"
                className="input w-full"
              />
            )}
          />
          {errors.createdAt && <p className="text-red-400 text-xs mt-1">{errors.createdAt.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">GitHub / Live Link</label>
        <input
          {...register('link', {
            pattern: { value: /^https?:\/\/.+/, message: 'URL e vlefshme (https://...)' }
          })}
          placeholder="https://github.com/..."
          className="input"
        />
        {errors.link && <p className="text-red-400 text-xs mt-1">{errors.link.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="featured" {...register('featured')} className="accent-accent w-4 h-4" />
        <label htmlFor="featured" className="text-sm text-white/60">Featured project</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
          {isSubmitting ? 'Duke ruajtur...' : defaultValues?.id ? 'Përditëso' : 'Shto Projektin'}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">Anulo</button>
      </div>
    </form>
  )
}