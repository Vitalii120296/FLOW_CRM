import React, { useEffect, useState } from 'react'
import { BiSolidError } from 'react-icons/bi'

import styles from './UsersCreate.module.scss'
import cn from 'classnames'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { validateService } from '../../services/validateServices'
import { getValidationErrorMessage } from '../../types/validationMessages'
import type { ValidationError } from '../../types/ValidationErrorType'
import type { SystemUser } from '../../types'

type FormErrors = {
  email?: ValidationError
  password?: ValidationError
}

type UsersCreateProps = {
  onAddUser: (user: SystemUser) => void
}

// Новый тип для локального хранения созданного пользователя
type LocalUser = SystemUser & { password: string }

export const UsersCreate: React.FC<UsersCreateProps> = ({ onAddUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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

    const newUser: LocalUser = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      password,
      role: 'user',
      status: 'active',
    }

    // добавляем пользователя в таблицу
    onAddUser(newUser)

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

        <div className={styles.passwordWrapper}>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handleChange('password', setPassword)}
            className={errors.password ? 'errorInput' : ''}
          />

          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

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
