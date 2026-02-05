import type { SystemUser } from '../../types'

export const getUsersTestApi = async (): Promise<SystemUser[]> => {
  return Promise.resolve([
    {
      id: '1',
      email: 'owner@flowcrm.com',
      name: 'Admin Owner',
      role: 'user',
      status: 'active',
    },
    {
      id: '2',
      email: 'oleh.kirichenko@flowcrm.com',
      name: 'Oleh Kirichenko',
      role: 'user',
      status: 'active',
    },
    {
      id: '3',
      email: 'anna.shevchenko@flowcrm.com',
      name: 'Anna Shevchenko',
      role: 'user',
      status: 'inactive',
    },
    {
      id: '4',
      email: 'maks.ivanov@flowcrm.com',
      name: 'Maks Ivanov',
      role: 'user',
      status: 'active',
    },
    {
      id: '5',
      email: 'support@flowcrm.com',
      name: 'Support Bot',
      role: 'user',
      status: 'inactive',
    },
  ])
}
