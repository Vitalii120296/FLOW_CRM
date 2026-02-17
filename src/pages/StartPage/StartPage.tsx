import s from './StartPage.module.scss'
import cn from 'classnames'

import { BiLockOpenAlt } from 'react-icons/bi'
import { MdOutlineAccessTime } from 'react-icons/md'
import { BiSignal3 } from 'react-icons/bi'
import { AiOutlineTool } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

import { motion } from 'framer-motion'

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

            <button className={s.loginBlock}>
              <a className={s.loginButton} href="#/crm">
                Sing Up
              </a>
            </button>
          </div>
        </div>
      </header>
      {/* MAIN CONTENT */}
      <section className={cn(s.contentContainer, s.aboutWrapper)}>
        <div className={s.startInfo}>
          <div className={s.startInfoContent}>
            <div className={s.newVersion}>
              <span className={s.dot}>•</span>
              <span>NEW VERSION</span>
            </div>

            <h1 className={s.startInfoText}>
              CRM with a <span className={s.gradientText}>simple interface</span> for B2C businesses
            </h1>

            <p>Take advantage of a free trial subscription</p>
            <button className={s.startButton} onClick={() => (window.location.href = '#/crm')}>
              <BiLockOpenAlt className={s.biLock} />
              <span className={s.getStarted}>Get started</span>
            </button>
            <div className={s.additionalInfo}>
              <div>
                <IoIosCheckmarkCircleOutline className={s.adIc} />

                <p>VERSION-1.0</p>
              </div>
              <div>
                <GoLock className={s.adIc} />
                <p>ALL DATA PROTECTED</p>
              </div>
            </div>
          </div>
        </div>

        <div className={s.preview}>
          <div className={s.previewContent}>
            <div className={s.previewImageWrapper}>
              <motion.img
                src="kanban.webp"
                alt="CRM Preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ===== FEATURES / KEY BENEFITS ===== */}
      <section className={s.featuresWrapper}>
        <div className={s.contentContainer}>
          <div className={s.feature}>
            <MdOutlineAccessTime className={s.featureIcon} />
            <h3>Fast platform</h3>
            <p>Описание преимущества...</p>
          </div>
          <div className={s.feature}>
            <AiOutlineTool className={s.featureIcon} />
            <h3>Best feature</h3>
            <p>Описание преимущества...</p>
          </div>
          <div className={s.feature}>
            <BiSignal3 className={s.featureIcon} />
            <h3>Frequent updates</h3>
            <p>Описание преимущества...</p>
          </div>
        </div>
      </section>
    </div>
  )
}
