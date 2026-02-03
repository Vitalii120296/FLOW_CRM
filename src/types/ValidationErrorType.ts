// runtime-значения (разрешены)
export const ValidationErrorType = {
  REQUIRED: 'required',
  INVALID: 'invalid',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
} as const

// type-only
export type ValidationErrorType = (typeof ValidationErrorType)[keyof typeof ValidationErrorType]

// дискриминируемое объединение
export type ValidationError =
  | { type: typeof ValidationErrorType.REQUIRED }
  | { type: typeof ValidationErrorType.INVALID }
  | { type: typeof ValidationErrorType.MIN_LENGTH; min: number }
  | { type: typeof ValidationErrorType.MAX_LENGTH; max: number }
