import { validateService } from '../../services/validateServices'
import { ValidationErrorType } from '../../types/ValidationErrorType'
import { useState } from 'react'

export const useProductValidate = <T extends Record<string, string>>() => {
  const [errors, setErrors] = useState<Partial<T>>({})

  const validate = (field: keyof T, value: string) => {
    let errorMessage = ''

    if (field === 'title') {
      const error = validateService.validateProductTitle(value)
      if (error && value.length > 0) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Title is required'
        } else if (error.type === ValidationErrorType.MIN_LENGTH) {
          errorMessage = `* Title must be at least ${error.min} characters`
        } else if (error.type === ValidationErrorType.MAX_LENGTH) {
          errorMessage = `* Title must be less than ${error.max} characters`
        }
      }
    }

    if (field === 'price') {
      const error = validateService.validateProductPrice(value)
      if (error && value.length > 0) {
        if (error.type === ValidationErrorType.REQUIRED) {
          errorMessage = '* Price is required'
        } else if (error.type === ValidationErrorType.INVALID) {
          errorMessage =
            '* Price must be greater than 0 and may contain up to 2 decimal places (no commas allowed).'
        }
      }
    }

    if (field === 'description') {
      const error = validateService.validateProductDescription(value)
      if (error && value.length > 0) {
        if (error.type === ValidationErrorType.MAX_LENGTH) {
          errorMessage = `* Description must be less than ${error.max} characters`
        }
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }))
  }

  const hasErrors = Object.values(errors).some(Boolean)

  return { hasErrors, errors, validate }
}
