import { PropertiesHEAD } from '../../widgets/Properties/PropertiesHEAD'
import styles from './PropertiesPage.module.scss'
import { BsBuilding } from 'react-icons/bs'

import cn from 'classnames'

export const PropertiesPage = () => {
  return (
    <div className="page-container">
      {/* <div className="container"> */}
      <div className={styles.titleContainer}>
        <h1 className={cn('h2', styles.title)}>Properties</h1>
        <BsBuilding className={styles.icon} />
      </div>

      <PropertiesHEAD />
      <div className={styles.wrapper}></div>
    </div>
    // </div>
  )
}
