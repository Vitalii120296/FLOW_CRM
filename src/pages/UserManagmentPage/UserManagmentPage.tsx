import { useEffect, useState } from 'react'
import type { SystemUser } from '../../types'
import cn from 'classnames'

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

  const handleAddUser = (newUser: SystemUser) => {
    setUsers((prev) => [...prev, newUser])
  }

  useEffect(() => {
    getUsersTestApi().then(setUsers)
  }, [])

  return (
    <div className="page-container">
      <h1 className={cn('h2', styles.title)}>Users</h1>
      <div className={styles.wrapper}>
        <UsersTable users={users} onToggleStatus={handleToggleStatus} />
        <UsersCreate onAddUser={handleAddUser} />
      </div>
    </div>
  )
}
