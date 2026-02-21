import { useState } from 'react'
import { Link } from 'react-router'

import s from './RegisterPage.module.scss'
import cn from 'classnames'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { useAuthValidate } from '../../shared/hooks/useAuthValidate'
import type { FormData } from '../../types'

export const RegisterPage = () => {
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { hasErrors, errors, validate } = useAuthValidate(formData)

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

  const isSuccesInput = (value: keyof FormData) =>
    touched[value] && !errors[value] && formData[value].length > 0 ? true : false

  return (
    <section className={cn('container', s.section_aperance)}>
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
              required
              value={formData.name}
              onFocus={() => handleTouch('name')}
              onChange={(e) => handleChange('name', e.target.value)}
              className={cn({
                [s.errorInput]: touched.name && errors.name,
                [s.successInput]: isSuccesInput('name'),
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
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => handleTouch('email')}
              className={cn({
                [s.errorInput]: touched.email && errors.email,
                [s.successInput]: isSuccesInput('email'),
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
              required
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onFocus={() => handleTouch('password')}
              onPaste={handleBlock}
              onCopy={handleBlock}
              onPasteCapture={handleBlock}
              className={cn({
                [s.errorInput]: touched.password && errors.password,
                [s.successInput]: isSuccesInput('password'),
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
              required
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              onFocus={() => handleTouch('confirmPassword')}
              onPaste={handleBlock}
              onCopy={handleBlock}
              onPasteCapture={handleBlock}
              className={cn({
                [s.errorInput]: touched.confirmPassword && errors.confirmPassword,
                [s.successInput]: isSuccesInput('confirmPassword'),
              })}
            />
            <button
              type="button"
              className={s.togglePassword}
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            >
              {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {touched.confirmPassword && errors.confirmPassword && (
            <span className={s.errorText}>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting || hasErrors} className={s.submit}>
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
