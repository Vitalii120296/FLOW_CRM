import React, { useEffect, useState } from 'react'
import { BiSolidError } from 'react-icons/bi'

import styles from './UsersCreate.module.scss'
import cn from 'classnames'

import { validateService } from '../../services/validateServices'
import { getValidationErrorMessage } from '../../types/validationMessages'
import type { ValidationError } from '../../types/ValidationErrorType'

type FormErrors = {
  email?: ValidationError
  password?: ValidationError
}

export const UsersCreate: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = {}

    const emailError = validateService.validateEmail(email)
    if (emailError) newErrors.email = emailError

    const passwordError = validateService.validatePassword(password)
    if (passwordError) newErrors.password = passwordError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSuccess(false)
      return
    }

    const payload = {
      email,
      password,
      role: 'user' as const,
      status: 'active' as const,
    }

    console.log('Create user:', payload)

    setIsSuccess(true)
    setCountdown(5)

    setEmail('')
    setPassword('')
    setErrors({})
  }

  const handleChange =
    (field: keyof FormErrors, setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      setIsSuccess(false)
    }

  useEffect(() => {
    if (!isSuccess) return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsSuccess(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isSuccess])

  return (
    <div className={styles.wrapper}>
      <h1 className={cn('h3', styles.title)}>Create User</h1>
      <form onSubmit={handleSubmit} className={styles.content}>
        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={handleChange('email', setEmail)}
          className={errors.email ? 'errorInput' : ''}
        />

        {errors.email && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />
            <p className="errorText">{getValidationErrorMessage(errors.email)}</p>
          </div>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange('password', setPassword)}
          className={errors.password ? 'errorInput' : ''}
        />

        {errors.password && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />
            <p className="errorText">{getValidationErrorMessage(errors.password)}</p>
          </div>
        )}

        <button type="submit" className={styles.create}>
          Create user
        </button>

        {isSuccess && (
          <div className={styles.sucessContainer}>
            <p className={styles.successText}>User created ✅ {countdown}</p>
          </div>
        )}
      </form>
    </div>
  )
}
