import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const CATEGORIES = ['Core', 'Framework', 'Styling', 'Tools', 'Backend', 'Other']

export default function SkillForm({ onSubmit, defaultValues, onCancel }) {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: defaultValues || { name: '', category: 'Core', level: 50 },
  })

  useEffect(() => { if (defaultValues) reset(defaultValues) }, [defaultValues, reset])

  const level = watch('level')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="label">Skill Name *</label>
        <input
          {...register('name', { required: 'Emri është i detyrueshëm' })}
          placeholder="React.js"
          className="input"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="label">Category</label>
        <select {...register('category')} className="input">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="label">Level: {level}%</label>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          {...register('level', { valueAsNumber: true })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between font-mono text-xs text-white/30 mt-1">
          <span>Beginner</span><span>Intermediate</span><span>Expert</span>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1">
          {defaultValues?.id ? 'Përditëso' : 'Shto Skill'}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">Anulo</button>
      </div>
    </form>
  )
}
