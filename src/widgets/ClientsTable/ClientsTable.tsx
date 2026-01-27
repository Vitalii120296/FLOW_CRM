import type React from 'react'
import type { Client } from '../../types'

// import styles from './ClientsTable.module.scss'

type Props = {
  clients: Client[]
}

export const ClientsTable: React.FC<Props> = ({ clients }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Comment</th>
        </tr>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>

            <td>
              <div>{client.email}</div>
              {client.phone && <div>{client.phone}</div>}
            </td>

            <td>—</td>

            <td>{client.status}</td>

            <td>{client.comment ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
