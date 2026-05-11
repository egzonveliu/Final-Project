import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, setError } = useForm()

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      toast.success('Account u krijua me sukses!')
      navigate('/dashboard')
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-mono text-sm text-accent tracking-widest">EV.dev</Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3 mb-2">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-white/40">Register to access the dashboard</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="label">Full Name *</label>
              <input
                {...register('name', { required: 'Emri është i detyrueshëm', minLength: { value: 2, message: 'Minimum 2 karaktere' } })}
                placeholder="Egzon Veliu"
                className="input"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label">Email *</label>
              <input
                {...register('email', { required: 'Email-i është i detyrueshëm', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email i pavlefshëm' } })}
                type="email"
                placeholder="egzon@example.com"
                className="input"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password *</label>
              <input
                {...register('password', { required: 'Fjalëkalimi është i detyrueshëm', minLength: { value: 6, message: 'Minimum 6 karaktere' } })}
                type="password"
                placeholder="••••••••"
                className="input"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="label">Confirm Password *</label>
              <input
                {...register('confirmPassword', {
                  required: 'Konfirmo fjalëkalimin',
                  validate: v => v === watch('password') || 'Fjalëkalimet nuk përputhen',
                })}
                type="password"
                placeholder="••••••••"
                className="input"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {errors.root && (
              <div className="p-3 bg-red-400/10 border border-red-400/20 rounded text-xs text-red-400">
                {errors.root.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center justify-center gap-2 mt-2">
              {isSubmitting ? 'Duke krijuar...' : <><UserPlus size={15} /> Create Account</>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-white/30 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent/70 transition-colors">Login</Link>
        </p>
      </div>
    </div>
  )
}