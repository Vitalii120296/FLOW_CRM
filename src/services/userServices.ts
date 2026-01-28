import { httpClient as client } from '../shared/api/httpClient'
import type { SystemUser } from '../types'

export const userService = {
  getAll: (companyId: string) =>
    client.get<SystemUser[]>('/users', {
      params: { companyId },
    }),

  getByEmail: (email: string) =>
    client.get<SystemUser>('/users/by-email', {
      params: { email },
    }),

  update: (userId: string, data: Partial<SystemUser>) =>
    client.patch<SystemUser>(`/users/${userId}`, data),

  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    client.patch('/users/me/password', data),

  changeEmail: (data: { password: string; newEmail: string }) =>
    client.patch('/users/me/email', data),
}
