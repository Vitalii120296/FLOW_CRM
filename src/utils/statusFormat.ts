import type { ClientStatus } from '../types'

export function statusFormat(status: ClientStatus) {
  switch (status) {
    case 'new':
      return 'New'
    case 'in_progress':
      return 'In Progress'
    case 'done':
      return 'Done'
    default:
      return ''
  }
}
