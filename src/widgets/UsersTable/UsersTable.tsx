import type React from 'react'
import type { SystemUser } from '../../types'

import styles from './UsersTable.module.scss'
import { FaStopCircle, FaPlayCircle } from 'react-icons/fa'

type Props = {
  users: SystemUser[]
  onToggleStatus: (userId: string) => void
}

export const UsersTable: React.FC<Props> = ({ users, onToggleStatus }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thId}>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            const isInactive = user.status === 'inactive'

            return (
              <tr key={user.id} className={isInactive ? styles.inactiveRow : ''}>
                <td className={styles.tdIndex}>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>

                <td className={styles.actions}>
                  <button
                    className={styles.iconButton}
                    onClick={() => onToggleStatus(user.id)}
                    disabled={false}
                    title={isInactive ? 'Activate user' : 'Deactivate user'}
                  >
                    {isInactive ? (
                      <FaPlayCircle className={styles.FaPlayCircle} />
                    ) : (
                      <FaStopCircle className={styles.FaStopCircle} />
                    )}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
