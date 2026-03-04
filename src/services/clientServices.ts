import { httpClient as client } from '../shared/api/httpClient'
import type { Client } from '../types'

export const clientService = {
  getAll: (): Promise<Client[]> => {
    return client.get('/clients/')
  },

  addClient: (
    data: Pick<Client, 'first_name' | 'last_name' | 'email' | 'comment' | 'phone' | 'createdBy'>
  ): Promise<Client> => {
    return client.post('clients/', data)
  },
  // NOTE якщо потрібно
  getClient: (clientId: string): Promise<Client> => {
    return client.get('/clients/by-clientId', {
      params: { clientId },
    })
  },

  updateClient: (clientId: string, data: Partial<Client>): Promise<Client> => {
    return client.patch(`/clients/${clientId}/`, data)
  },

  updateClientStatus: (clientId: string, status: string): Promise<Client> => {
    return client.patch(`/clients/${clientId}/`, { status })
  },
}
