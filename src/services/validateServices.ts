import { ValidationErrorType, type ValidationError } from '../types/ValidationErrorType'

const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/
const PHONE_PATTERN = /^\+?\d{10,15}$/ // +380XXXXXXXXX или 380XXXXXXXXX или 0XXXXXXXXX

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '')
}

function validateLength(
  value: string,
  options: { min?: number; max?: number }
): ValidationError | undefined {
  if (options.min !== undefined && value.length < options.min) {
    return { type: ValidationErrorType.MIN_LENGTH, min: options.min }
  }

  if (options.max !== undefined && value.length > options.max) {
    return { type: ValidationErrorType.MAX_LENGTH, max: options.max }
  }

  return undefined
}

/* ---------------- EMAIL ---------------- */

export function validateEmail(value: string): ValidationError | undefined {
  if (!value) {
    return { type: ValidationErrorType.REQUIRED }
  }

  if (!EMAIL_PATTERN.test(value)) {
    return { type: ValidationErrorType.INVALID }
  }

  return undefined
}

/* ---------------- PHONE ---------------- */

export function validatePhone(value: string): ValidationError | undefined {
  if (!value) {
    return { type: ValidationErrorType.REQUIRED }
  }

  const normalized = normalizePhone(value)

  if (!PHONE_PATTERN.test(normalized)) {
    return { type: ValidationErrorType.INVALID }
  }

  return undefined
}

/* ---------------- COMMENT ---------------- */

export function validateComment(value: string): ValidationError | undefined {
  if (!value) {
    return undefined // comment не обязателен
  }

  if (value.length < 6) {
    return {
      type: ValidationErrorType.MIN_LENGTH,
      min: 6,
    }
  }

  if (value.length > 100) {
    return {
      type: ValidationErrorType.MAX_LENGTH,
      max: 100,
    }
  }

  return undefined
}

/* ---------------- NAME ---------------- */

export function validateName(value: string): ValidationError | undefined {
  if (!value.trim()) {
    return { type: ValidationErrorType.REQUIRED }
  }

  return validateLength(value, { min: 2, max: 50 })
}

/* ---------------- PUBLIC API ---------------- */

export const validateService = {
  validateEmail,
  validatePhone,
  validateComment,
  validateName,
}
