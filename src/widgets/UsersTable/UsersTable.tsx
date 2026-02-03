import type React from 'react'
import type { SystemUser } from '../../types'

import styles from './UsersTable.module.scss'

type Props = {
  users: SystemUser[]
  // setUsers: React.Dispatch<React.SetStateAction<SystemUser[]>>
}

export const UsersTable: React.FC<Props> = ({ users }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.id ?? index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
