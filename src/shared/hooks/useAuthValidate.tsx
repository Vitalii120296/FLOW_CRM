import { validateService } from '../../services/validateServices'
import { ValidationErrorType } from '../../types/ValidationErrorType'
import { useState } from 'react'

export const useAuthValidate = <T extends Record<string, string>>(formData: T) => {
  const [errors, setErrors] = useState<Partial<T>>({})

  const validate = (field: keyof T, value: string) => {
    let errorMessage = ''

    if (field === 'name') {
      const error = validateService.validateName(value)
      if (error && value.length > 0) {
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
      const error = validateService.validateEmail(value)
      if (error && value.length > 0) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Email is required'
        } else if (error.type === ValidationErrorType.INVALID) {
          errorMessage = '* Invalid email format'
        }
      }
    }

    if (field === 'password') {
      const error = validateService.validatePassword(value)
      if (error && value.length > 0) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Password is required'
        } else if (error.type === ValidationErrorType.MIN_LENGTH) {
          errorMessage = `* Password must be at least ${error.min} characters`
        } else if (error.type === ValidationErrorType.INVALID) {
          errorMessage =
            '* Password must contain at least one uppercase letter, one lowercase letter and one number'
        } else if (error.type === ValidationErrorType.MAX_LENGTH) {
          errorMessage = `* Password must be less than ${error.max} characters`
        }
      }
    }

    if (field === 'confirmPassword' && value !== formData.password && value.length > 0) {
      errorMessage = '* Passwords do not match'
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }))
  }
  const hasErrors = Object.values(errors).some(Boolean)

  return { hasErrors, errors, validate }
}
