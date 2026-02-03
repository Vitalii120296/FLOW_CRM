import { useEffect, useState } from 'react'
import type { SystemUser } from '../../types'

// import styles from './UserManagmentPage.module.scss'

import { getUsersTestApi } from '../../shared/api/users.test-api'
import { UsersTable } from '../../widgets/UsersTable/UsersTable'

export const UserManagmentPage = () => {
  const [users, setUsers] = useState<SystemUser[]>([])

  useEffect(() => {
    getUsersTestApi().then(setUsers)
  }, [])

  return (
    <div className="page-container">
      <UsersTable users={users} />
    </div>
  )
}
