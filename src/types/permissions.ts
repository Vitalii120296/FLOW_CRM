import type { UserRole } from './auth'

export type Permission =
  | 'profile.edit'
  | 'profile.changePassword'
  | 'profile.restore'
  | 'profile.avatar.update'
  | 'client.create'
  | 'client.edit'
  | 'user.view'
  | 'user.create'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  user: [
    'profile.edit',
    'profile.changePassword',
    'profile.restore',
    'profile.avatar.update',
    'client.create',
    'client.edit',
  ],

  owner: [
    'profile.edit',
    'profile.changePassword',
    'profile.restore',
    'profile.avatar.update',
    'client.create',
    'client.edit',
    'user.view',
    'user.create',
  ],
}

export const hasPermission = (role: UserRole, permission: Permission) =>
  ROLE_PERMISSIONS[role].includes(permission)
