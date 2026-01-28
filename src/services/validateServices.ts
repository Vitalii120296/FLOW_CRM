const EMAIL_PATTERN = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/

function validateEmail(value: string) {
  if (!value) return 'Email is required'
  if (!EMAIL_PATTERN.test(value)) return 'Email is not valid'
}

function validatePassword(value: string) {
  if (!value) return 'Password is required'
  if (value.length < 6) return 'At least 6 characters'
}

export const validateService = {
  validateEmail,
  validatePassword,
}
