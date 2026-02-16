import s from './StartPage.module.scss'
import cn from 'classnames'

import { GoDotFill } from 'react-icons/go'

// import { motion } from 'framer-motion'

export const StartPage = () => {
  return (
    <div className={s.bg}>
      {/* HEADER */}
      <header className={s.headerContainer}>
        <div className={s.contentContainer}>
          <div className={s.headerContent}>
            <div className={s.logoBlock}>
              <div className={s.flow}>FLOW</div>
              <div className={s.crm}>
                <span style={{ color: '#a9dfd8' }}>C</span>
                <span style={{ color: '#f2c8ed' }}>R</span>
                <span style={{ color: '#f2994a' }}>M</span>
              </div>
            </div>

            <a href="#/crm">Enter CRM</a>
          </div>
        </div>
      </header>

      <div className={cn(s.contentContainer, s.sectionsWrapper)}>
        <section className={s.startInfo}>
          <div className={s.startInfoContent}>
            <div className={s.newVersion}>
              <span className={s.dot}>•</span>
              <span>NEW VERSION</span>
            </div>
            <h1 className={s.startInfoText}>
              CRM with a <span className={s.gradientText}>simple interface</span> for B2C businesses
            </h1>

            <p>Take advantage of a free trial subscription</p>
            <button className={s.startButton}> Get started</button>
          </div>
        </section>

        <section className={s.preview}>
          <div className={s.previewContent}>
            <h1>preview kanban</h1>
          </div>
        </section>
      </div>
    </div>
  )
}
