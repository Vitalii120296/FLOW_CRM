import { httpClient as client } from '../shared/api/httpClient'
import type { PropertiesInfo } from '../types/properties'

export const propertiesService = {
  getProperties: (): Promise<PropertiesInfo[]> => {
    return client.get('business/')
  },

  updateProperties: (data: FormData): Promise<PropertiesInfo> => {
    return client.post('business/', data)
  },
}
