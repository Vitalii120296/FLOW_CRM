import type React from 'react'
import { useState } from 'react'
import type { Client } from '../../types'

import styles from './ClientsTable.module.scss'
import { ClientDetails } from '../ClientDetails/ClientDetails'

type Props = {
  clients: Client[]
}

export const ClientsTable: React.FC<Props> = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thId}>#</th>
            <th>Creator</th>
            <th>Phone number</th>
            <th>Preferences</th>
            <th>Status</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client, index) => {
            const [name = '—', surname = '—'] = client.name.split(' ')

            return (
              <tr key={client.id} onClick={() => setSelectedClient(client)} className={styles.row}>
                <td className={styles.tdIndex}>{index + 1}</td>

                <td>
                  {client.createdBy.firstName} {client.createdBy.lastName}
                </td>

                <td>{client.phone ?? '—'}</td>

                <td>{client.comment ?? '—'}</td>

                <td>
                  <span className={styles.status} data-status={client.status}>
                    {client.status}
                  </span>
                </td>

                <td>{name}</td>
                <td>{surname}</td>
              </tr>
            )
          })}

          {clients.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No clients found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedClient && (
        <ClientDetails client={selectedClient} quit={() => setSelectedClient(null)} />
      )}
    </div>
  )
}
