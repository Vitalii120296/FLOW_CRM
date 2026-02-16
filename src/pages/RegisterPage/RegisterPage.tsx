import { useState } from 'react'
import s from './RegisterPage.module.scss'
import cn from 'classnames'
import { Link } from 'react-router'
import type { FormData } from '../../types'
import { useAuthValidate } from '../../shared/hooks/useAuthValidate'
export const RegisterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { errors, validate } = useAuthValidate(formData)

  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBlock = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validate(field, value)
  }

  const handleTouch = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validate(field, formData[field])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // перевірка всіх полів перед сабмітом
    Object.entries(formData).forEach(([key, value]) => {
      validate(key as keyof FormData, value)
    })

    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors) return

    setIsSubmitting(true)

    // тут буде API запит
    console.log('Form submitted:', formData)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="container">
      <h1 className="h1">Register</h1>

      <form className={s.form} onSubmit={handleSubmit}>
        {/* Name */}
        <div className={s.field}>
          <div
            className={cn(s.inputWrapper, {
              [s.active]: touched.name,
            })}
          >
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onFocus={() => handleTouch('name')}
              onChange={(e) => handleChange('name', e.target.value)}
              className={cn({
                [s.errorInput]: touched.name && errors.name,
                [s.successInput]: touched.name && !errors.name,
              })}
            />
          </div>

          {touched.name && errors.name && <span className={s.errorText}>{errors.name}</span>}
        </div>

        {/* Email */}
        <div className={s.field}>
          <div
            className={cn(s.inputWrapper, {
              [s.active]: touched.email,
            })}
          >
            <label htmlFor="email">Email</label>
            <input
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
              [s.active]: touched.password,
            })}
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onFocus={() => handleTouch('password')}
              onPaste={handleBlock}
              onCopy={handleBlock}
              onPasteCapture={handleBlock}
              className={cn({
                [s.errorInput]: touched.password && errors.password,
                [s.successInput]: touched.password && !errors.password,
              })}
            />
          </div>
          {touched.password && errors.password && (
            <span className={s.errorText}>{errors.password}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className={s.field}>
          <div
            className={cn(s.inputWrapper, {
              [s.active]: touched.confirmPassword,
            })}
          >
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              onFocus={() => handleTouch('confirmPassword')}
              onPaste={handleBlock}
              onCopy={handleBlock}
              onPasteCapture={handleBlock}
              className={cn({
                [s.errorInput]: touched.confirmPassword && errors.confirmPassword,
                [s.successInput]: touched.confirmPassword && !errors.confirmPassword,
              })}
            />
          </div>

          {touched.confirmPassword && errors.confirmPassword && (
            <span className={s.errorText}>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={s.submit}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className={s.login_link}>
        <span>Already have an account?</span>
        <Link to="/login">Login here</Link>
      </div>
    </section>
  )
}
