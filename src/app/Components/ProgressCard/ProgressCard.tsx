import { useEffect, useState } from 'react'
import type { Client, ClientStatus } from '../../../types'
import s from './ProgressCard.module.scss'
import { getClientsTestApi } from '../../../shared/api/clients.test-api'
import { BsFillCircleFill } from 'react-icons/bs'
import cn from 'classnames'

import { ClientCreate } from '../../../widgets/ClientCreate/ClientCreate'

type Props = {
  clientStatus: ClientStatus
  setSelectedClient: (client: Client) => void
}

export const ProgressCard: React.FC<Props> = ({ clientStatus, setSelectedClient }) => {
  const [clients, setClients] = useState<Client[]>([])

  // NOTE: для модалки додавання
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getClientsTestApi().then((data) => {
      const filteredClients = data.filter((client) => client.status === clientStatus)
      setClients(filteredClients)
    })
  }, [])

  const status = (clientStatus: ClientStatus) => {
    switch (clientStatus) {
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

  const selectClient = (client: Client) => {
    setSelectedClient(client)
  }

  // const addClient = () => {}

  return (
    <>
      <article className={s.progress_card}>
        <div className={s.progress_card__top_bar}>
          <h2 className={cn('h3', s.status)}>{status(clientStatus)}</h2>
          <button type="button" className={s.add_client} onClick={() => setIsModalOpen(true)}>
            + Add Client
          </button>
        </div>
        <div className={s.progress_card__column}>
          <ul>
            {clients.map((client) => (
              <li key={client.id} className={s.client} onClick={() => selectClient(client)}>
                <p className={s.name}>
                  <BsFillCircleFill
                    aria-hidden="true"
                    className={cn(s.icon, {
                      [s.green]: client.status === 'new',
                      [s.yellow]: client.status === 'in_progress',
                      [s.blue]: client.status === 'done',
                    })}
                  />
                  {client.name}
                </p>
                {client.email && <p className={s.contact}>{client.email}</p>}
                {client.phone && <p className={s.contact}>{client.phone}</p>}
                {client.sum && <p className={s.sum}>{client.sum}</p>}
                {client.comment && <p className={s.comment}>{client.comment}</p>}
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* // NOTE: модалка */}
      {isModalOpen && <ClientCreate onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
