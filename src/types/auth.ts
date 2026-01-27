export type UserRole = 'admin' | 'user'

export type SystemUser = {
  id: string
  email: string

  firstName: string
  lastName: string

  role: UserRole

  avatarUrl?: string

  companyId: string
  createdAt: string
}
