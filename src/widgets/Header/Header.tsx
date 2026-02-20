import { Link } from 'react-router-dom'
import { BsCaretDownFill, BsJustify } from 'react-icons/bs'
import Avatar from '/public/icons/avatar.png'
import styles from './Header.module.scss'

type Props = {
  setShowBurger: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<Props> = ({ setShowBurger }) => {
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
            <Link to="/profile" className={styles.header__profileWrapper}>
              <div className={styles.header__profileAvatar}>
                <img src={Avatar} alt="Avatar" />
              </div>

              {/* ТРИГГЕР */}
              <div className={styles.header__profileTrigger}>
                <p className={styles.header__profileUserName}>Name Surname</p>
                <BsCaretDownFill className="icon" />
                {/* dropdown */}
                <div className={styles.header__profileDropdown}>
                  <p className={styles.header__profileName}>Name Surname</p>
                  <p className={styles.header__profileEmail}>name.surname@mail.com</p>
                </div>
              </div>
            </Link>
            <button
              className={styles.header__profile_burger}
              onClick={() => setShowBurger((prev) => !prev)}
            >
              <BsJustify />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
