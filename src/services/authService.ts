import { authClient as client } from '../shared/api/authClient'
import type { FormData, SystemUser } from '../types'

export interface AuthData {
  accessToken: string
  user: SystemUser
}

export const authService = {
  register: (data: FormData): Promise<SystemUser> => {
    return client.post('/users/register/', {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirm: data.confirmPassword,
    })
  },

  login: (email: string, password: string): Promise<SystemUser> => {
    return client.post('/users/login/', { email, password })
  },

  logout: () => client.post('/users/logout/'),

  resetPassword: (
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<SystemUser> => {
    return client.post(`/reset-password/${email}`, { password, confirmPassword })
  },

  refresh: (): Promise<SystemUser> => client.post('/users/refresh/'),
}
