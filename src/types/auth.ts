export type UserRole = 'owner' | 'user'
export type UserStatus = 'active' | 'inactive'

export type SystemUser = {
  id: string
  email: string
  photo?: string
  name: string

  role: UserRole
  status: UserStatus
}
