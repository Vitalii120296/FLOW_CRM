import { httpClient as client } from '../shared/api/httpClient'
import type { SystemUser } from '../types'

export const userService = {
  // Отримати всіх користувачів компанії
  getAll: (companyId: string) => client.get<SystemUser[]>('/users', { params: { companyId } }),

  // Отримати поточного користувача
  getCurrentUser: (): Promise<SystemUser> => client.get('/users/me/'),

  // Оновити дані поточного користувача
  updateUserData: (
    data: Partial<Pick<SystemUser, 'first_name' | 'last_name' | 'email'>>
  ): Promise<SystemUser> => client.patch('/users/me/', data),

  // Оновити користувача за id
  update: (userId: string, data: Partial<SystemUser>): Promise<SystemUser> =>
    client.patch(`/users/${userId}`, data),

  // Змінити пароль поточного користувача
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    client.patch('/users/me/password', data),

  // Змінити email поточного користувача
  changeEmail: (data: { password: string; newEmail: string }) =>
    client.patch('/users/me/email', data),

  // Отримати користувача за email
  getByEmail: (email: string) => client.get<SystemUser>('/users/by-email', { params: { email } }),
}
