import { ValidationErrorType, type ValidationError } from './ValidationErrorType'

export function getValidationErrorMessage(error: ValidationError): string {
  switch (error.type) {
    case ValidationErrorType.REQUIRED:
      return 'This field is required'

    case ValidationErrorType.INVALID:
      return 'Invalid value'

    case ValidationErrorType.MIN_LENGTH:
      return `Minimum ${error.min} characters`

    case ValidationErrorType.MAX_LENGTH:
      return `Maximum ${error.max} characters`

    default:
      return 'Invalid value'
  }
}
