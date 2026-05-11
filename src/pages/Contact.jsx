import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { submitContact } from '../api/client'
import { Mail, Phone, MapPin, Github, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const contacts = [
  { icon: Mail, label: 'Email', value: 'egzonn14@gmail.com', href: 'mailto:egzonn14@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+383 49 578 345', href: 'tel:+38349578345' },
  { icon: MapPin, label: 'Location', value: 'Kosovo', href: null },
  { icon: Github, label: 'GitHub', value: 'github.com/egzonveliu', href: 'https://github.com/egzonveliu' },
]

function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="section-tag mb-3">Contact</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-3">Get in Touch</h2>
        <p className="text-sm text-gray-500 dark:text-white/45 leading-relaxed">
          I'm open to internship opportunities and junior front-end developer roles. Feel free to reach out!
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {contacts.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-center gap-4 p-4 card">
            <div className="w-9 h-9 rounded bg-accent/[0.07] border border-accent/15 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-accent" />
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-400 dark:text-white/30 tracking-widest uppercase">{label}</p>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="text-sm text-gray-600 dark:text-white/70 hover:text-accent transition-colors">
                  {value}
                </a>
              ) : (
                <p className="text-sm text-gray-600 dark:text-white/70">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-accent/[0.04] border border-accent/[0.12] rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
          <span className="font-mono text-xs text-accent tracking-widest">OPEN TO OPPORTUNITIES</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/45">Actively looking for internships or junior front-end developer positions.</p>
      </div>
    </div>
  )
}

function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      toast.success('Mesazhi u dërgua me sukses!')
      reset()
    },
    onError: () => toast.error('Diçka shkoi keq. Provo përsëri.'),
  })

  return (
    <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="card flex flex-col gap-4">
      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Send a Message</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Your Name *</label>
          <input {...register('name', { required: 'Emri është i detyrueshëm' })} placeholder="John Doe" className="input" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Your Email *</label>
          <input
            {...register('email', { required: 'Email-i është i detyrueshëm', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email i pavlefshëm' } })}
            placeholder="john@example.com"
            className="input"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Subject *</label>
        <input
          {...register('subject', { required: 'Subjekti është i detyrueshëm' })}
          placeholder="Job Opportunity / Internship"
          className="input"
        />
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="label">Message *</label>
        <textarea
          {...register('message', { required: 'Mesazhi eshte i detyrueshem', minLength: { value: 20, message: 'Minimum 20 karaktere' } })}
          placeholder="Pershkruaj si mund te bashkepunojme..."
          rows={5}
          className="input resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={mutation.isPending} className="btn-primary flex items-center justify-center gap-2">
        {mutation.isPending ? 'Duke dërguar...' : <><Send size={14} /> Dergo Mesazhin</>}
      </button>

      {mutation.isSuccess && (
        <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded p-3">
          <CheckCircle size={16} /> Mesazhi u dergua! Do te kthehem sa me shpejt.
        </div>
      )}
    </form>
  )
}

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}