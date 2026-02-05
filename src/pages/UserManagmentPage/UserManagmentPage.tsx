import { useEffect, useState } from 'react'
import type { SystemUser } from '../../types'

import styles from './UserManagmentPage.module.scss'

import { getUsersTestApi } from '../../shared/api/users.test-api'
import { UsersTable } from '../../widgets/UsersTable/UsersTable'
import { UsersCreate } from '../../widgets/UsersCreate/UsersCreate'

export const UserManagmentPage = () => {
  const [users, setUsers] = useState<SystemUser[]>([])

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user
      )
    )
  }

  useEffect(() => {
    getUsersTestApi().then(setUsers)
  }, [])

  return (
    <div className="page-container">
      <div className={styles.wrapper}>
        <UsersTable users={users} onToggleStatus={handleToggleStatus} />
        <UsersCreate />
      </div>
    </div>
  )
}
