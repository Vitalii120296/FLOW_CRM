import { httpClient as client } from '../shared/api/httpClient'
import type { Client } from '../types'

export const clientService = {
  getAll: (): Promise<Client[]> => {
    return client.get('/clients')
  },
  // NOTE якщо потрібно
  getClient: (clientId: string): Promise<Client> => {
    return client.get('/clients/by-clientId', {
      params: { clientId },
    })
  },

  updateClient: (clientId: string, data: Partial<Client>): Promise<Client> => {
    return client.patch(`/client-data/${clientId}`, data)
  },
}
