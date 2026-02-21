import { useState } from 'react'

import s from './LoginPage.module.scss'
import cn from 'classnames'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { Link } from 'react-router'
import { useAuthValidate } from '../../shared/hooks/useAuthValidate'

type LoginForm = {
  email: string
  password: string
}

export const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState<Partial<Record<keyof LoginForm, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { hasErrors, errors, validate } = useAuthValidate<LoginForm>(formData)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleChange = (field: keyof LoginForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validate(field, value)
  }

  const handleTouch = (field: keyof LoginForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validate(field, formData[field])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    Object.entries(formData).forEach(([key, value]) => {
      validate(key as keyof LoginForm, value)
    })

    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors) return

    setIsSubmitting(true)

    console.log('Login data:', formData)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className={cn('container', s.section_aperance)}>
      <h1 className="h1">Login</h1>

      <form className={s.form} onSubmit={handleSubmit}>
        {/* Email */}
        <div className={s.field}>
          <div
            className={cn(s.inputWrapper, {
              [s.active]: touched.email || formData.email,
            })}
          >
            <label htmlFor="email">Email</label>
            <input
              required
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => handleTouch('email')}
              className={cn({
                [s.errorInput]: touched.email && errors.email,
                [s.successInput]: touched.email && !errors.email,
              })}
            />
          </div>

          {touched.email && errors.email && <span className={s.errorText}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={s.field}>
          <div
            className={cn(s.inputWrapper, {
              [s.active]: touched.password || formData.password,
            })}
          >
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onFocus={() => handleTouch('password')}
              className={cn({
                [s.errorInput]: touched.password && errors.password,
                [s.successInput]: touched.password && !errors.password,
              })}
            />
            <button
              type="button"
              className={s.togglePassword}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {touched.password && errors.password && (
            <span className={s.errorText}>{errors.password}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting || hasErrors} className={s.submit}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className={s.login_link}>
        <span>Don’t have an account?</span>
        <Link to="/register">Register here</Link>
      </div>
    </section>
  )
}
