export type UserRole = 'owner' | 'user'
export type UserStatus = 'active' | 'inactive'

export type SystemUser = {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar?: string

  role?: UserRole
  status?: UserStatus
}

export type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
