import React from 'react'
import type { Client } from '../../../types'
import s from './ClientDetails.module.scss'

type Props = {
  client: Client
  quit: () => void
}

export const ClientDetails: React.FC<Props> = ({ client, quit }) => {
  return (
    <>
      <div className={s.client_details}>
        <div className={s.client_details__popup}>
          <div>{client.name}</div>
          <button onClick={quit}>close</button>
        </div>
      </div>
    </>
  )
}
