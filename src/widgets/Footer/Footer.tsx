import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import { FaGithub } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="container">
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.infoBlock}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoName}>
                <span className={styles.flow}>FLOW</span>
                <span className={styles.crm}>
                  <span className={styles.c}>C</span>
                  <span className={styles.r}>R</span>
                  <span className={styles.m}>M</span>
                </span>
              </div>
            </Link>

            <p className={styles.textInfo}>
              Is a sleek, user-friendly CRM designed to keep your team organized. Enjoy clean
              dashboards, quick client tracking, and smart automation that saves you time. Manage
              projects, monitor sales, and collaborate effortlessly — all in one place.
            </p>

            <p className={styles.createdBy}>Created by:</p>
            <nav className={styles.gitLinks}>
              <Link to="/profile" className={styles.gitIcons}>
                <FaGithub />
              </Link>
              <Link to="/profile" className={styles.gitIcons}>
                <FaGithub />
              </Link>
              <Link to="/profile" className={styles.gitIcons}>
                <FaGithub />
              </Link>
            </nav>
          </div>

          {/* Права частина: Navigation */}
          <div className={styles.navBlock}>
            <p className={styles.navTitle}>Navigation</p>
            <nav className={styles.navLinks}>
              <Link to="/">Kanban</Link>
              <Link to="/clients">Clients</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/products">Products</Link>
            </nav>
          </div>
        </div>

        <hr className={styles.hr} />

        <div className={styles.bottomBar}>
          <div className={styles.copyright}>© {new Date().getFullYear()} FLOW CRM</div>

          <div className={styles.privacyLink}>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Privacy
            </Link>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
