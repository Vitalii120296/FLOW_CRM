import {
  validateComment,
  validateEmail,
  validateName,
  validatePhone,
} from '../../services/validateServices'
import { ValidationErrorType } from '../../types/ValidationErrorType'
import { useState } from 'react'

export const useClientValidate = <T extends Record<string, string>>() => {
  const [errors, setErrors] = useState<Partial<T>>({})

  const validate = (field: keyof T, value: string) => {
    let errorMessage = ''

    if (field === 'fullName') {
      const error = validateName(value)
      if (error) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Name is required'
        } else if (error.type === ValidationErrorType.INVALID) {
          errorMessage = '* Name can contain only letters, spaces, apostrophes and hyphens'
        } else if (error.type === ValidationErrorType.MIN_LENGTH) {
          errorMessage = `* Name must be at least ${error.min} characters`
        } else if (error.type === ValidationErrorType.MAX_LENGTH) {
          errorMessage = `* Name must be less than ${error.max} characters`
        }
      }
    }

    if (field === 'email') {
      const error = validateEmail(value)
      if (error) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Email is required'
        } else if (error.type === ValidationErrorType.INVALID) {
          errorMessage = '* Invalid email format'
        }
      }
    }

    if (field === 'phone') {
      const error = validatePhone(value)
      if (error) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Phone is required'
        } else if (error.type === ValidationErrorType.INVALID) {
          errorMessage = '* Total length must be 10-15 digits (excluding +)'
        }
      }
    }

    if (field === 'comment') {
      const error = validateComment(value)

      if (error) {
        if (error.type === ValidationErrorType.MIN_LENGTH) {
          errorMessage = `* Comment must be at least ${error.min} characters`
        }
        if (error.type === ValidationErrorType.MAX_LENGTH) {
          errorMessage = `* Comment must be less than ${error.max} characters`
        }
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }))
  }

  return { errors, validate }
}
