import React from 'react'
import { Link } from 'react-router-dom'

import ArrowDown from '@/assets/icons/arrow-down.svg'
import Avatar from '@/assets/icons/avatar.png'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.header__inner}`}>
          <Link to="/" className={styles.header__logo}>
            <div className={styles.header__logo_name}>FLOW</div>
            <div className={styles.header__logo_type}>
              <span className={styles.c}>C</span>
              <span className={styles.r}>R</span>
              <span className={styles.m}>M</span>
            </div>
          </Link>

          <div className={styles.header__profile}>
            <div className={styles.header__profileWrapper}>
              <Link to="/profile" className={styles.header__profileAvatar}>
                <img src={Avatar} alt="Avatar" />
              </Link>

              {/* ТРИГГЕР */}
              <div className={styles.header__profileTrigger}>
                <p className={styles.header__profileUserName}>Name Surname</p>
                <img src={ArrowDown} alt="arrow" className="icon" />

                {/* dropdown */}
                <div className={styles.header__profileDropdown}>
                  <p className={styles.header__profileName}>Name Surname</p>
                  <p className={styles.header__profileEmail}>name.surname@mail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
