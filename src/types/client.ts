import type { SystemUser } from './auth'

export type ClientStatus = 'new' | 'in_progress' | 'done'

type ClientNote = {
  id: string
  content: string
}

export type Client = {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone: string
  amount?: number
  status: ClientStatus
  oredrIndex?: string

  comment?: string
  notes?: ClientNote[]

  createdBy: Pick<SystemUser, 'id' | 'first_name'>
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
