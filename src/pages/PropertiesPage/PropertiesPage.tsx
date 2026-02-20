import { Properties } from '../../widgets/Properties/Properties'
import styles from './PropertiesPage.module.scss'
import { BsBuilding } from 'react-icons/bs'

import cn from 'classnames'

export const PropertiesPage = () => {
  return (
    <div className="page-container">
      <div className={styles.titleContainer}>
        <h1 className={cn('h3', styles.title)}>Properties</h1>
        <BsBuilding className={styles.icon} />
      </div>

      <Properties />
    </div>
  )
}
