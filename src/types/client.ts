import type { SystemUser } from './auth'

export type ClientStatus = 'new' | 'in_progress' | 'done'

export type Client = {
  id: string
  name: string
  email: string
  phone?: string
  sum?: number
  status: ClientStatus

  comment?: string

  createdBy: Pick<SystemUser, 'id' | 'firstName' | 'lastName'>
  companyId: string
  createdAt: string
}

export type CreateClientDto = {
  name: string
  email: string
  phone?: string
  comment?: string
}

export type UpdateClientDto = Partial<CreateClientDto> & {
  status?: ClientStatus
}

export type ClientFilters = {
  search?: string
  status?: ClientStatus | 'all'
  createdById?: string
}
