import { useEffect, useState } from 'react'
import { SystemUser } from '../../types'

import styles from './UserManagment.module.scss'
import { getUsersTestApi } from '../../shared/api/users.test-api'

export const UserManagmentPage = () => {
  const [clients, setClients] = useState<SystemUser[]>([])

  useEffect(() => {
    getUsersTestApi().then(setClients)
  }, [])

  return (
    <table className={styles.tablet}>
      <thead>
        <tr>#</tr>
        <tr>Name</tr>
      </thead>
    </table>
  )
}
