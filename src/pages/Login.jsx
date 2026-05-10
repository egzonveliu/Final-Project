import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'
  const [showPass, setShowPass] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()

  const onSubmit = async (data) => {
    try {
      await login(data)
      toast.success('Welcome back, Egzon!')
      navigate(from, { replace: true })
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-mono text-sm text-accent tracking-widest">EV.dev</Link>
          <h1 className="text-3xl font-extrabold text-white mt-3 mb-2">Welcome back</h1>
          <p className="text-sm text-white/40">Login to access your dashboard</p>
        </div>

        <div className="card">
          {/* Demo credentials hint */}
          <div className="mb-6 p-3 bg-accent/[0.05] border border-accent/15 rounded text-xs text-white/50 font-mono">
            <p className="text-accent/80 mb-1">Demo credentials:</p>
            <p>Email: egzon@example.com</p>
            <p>Password: 123456</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
              <div className="relative">
                <input
                  {...register('password', { required: 'Fjalëkalimi është i detyrueshëm', minLength: { value: 6, message: 'Minimum 6 karaktere' } })}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input pr-10"
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {errors.root && (
              <div className="p-3 bg-red-400/10 border border-red-400/20 rounded text-xs text-red-400">
                {errors.root.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center justify-center gap-2 mt-2">
              {isSubmitting ? 'Duke u kyçur...' : <><LogIn size={15} /> Login</>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-white/30 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent hover:text-accent/70 transition-colors">Register</Link>
        </p>
      </div>
    </div>
  )
}
