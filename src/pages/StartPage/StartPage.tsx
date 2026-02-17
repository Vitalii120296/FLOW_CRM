import s from './StartPage.module.scss'
import cn from 'classnames'

import { BiLockOpenAlt } from 'react-icons/bi'
import { MdOutlineAccessTime } from 'react-icons/md'
import { BiSignal3 } from 'react-icons/bi'
import { AiOutlineTool } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
              <Link className={s.loginButton} to="/register">
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </header>
      {/* MAIN CONTENT */}

      <motion.section
        className={cn(s.contentContainer, s.aboutWrapper)}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2, // задержка между детьми
            },
          },
        }}
      >
        {/* Левый блок с информацией */}
        <motion.div
          className={s.startInfo}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
          }}
        >
          <motion.div
            className={s.startInfoContent}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            <motion.div
              className={s.newVersion}
              variants={{
                hidden: { opacity: 0, x: -10 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <span className={s.dot}>•</span>
              <span>NEW VERSION</span>
            </motion.div>

            <motion.h1
              className={s.startInfoText}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              CRM with a <span className={s.gradientText}>simple interface</span> for B2C businesses
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              Take advantage of a free trial subscription
            </motion.p>

            <motion.button
              className={s.startButton}
              onClick={() => (window.location.href = '#/crm')}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <BiLockOpenAlt className={s.biLock} />
              <span className={s.getStarted}>Get started</span>
            </motion.button>

            <motion.div
              className={s.additionalInfo}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <div>
                <IoIosCheckmarkCircleOutline className={s.adIc} />
                <p>VERSION-1.0</p>
              </div>
              <div>
                <GoLock className={s.adIc} />
                <p>ALL DATA PROTECTED</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Правый блок с превью */}
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
      </motion.section>

      {/* ===== FEATURES / KEY BENEFITS ===== */}
      <motion.section
        className={s.featuresWrapper}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2, // задержка между блоками
            },
          },
        }}
      >
        <div className={s.contentContainer}>
          {/* Feature 1 */}
          <motion.div
            className={s.feature}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            <MdOutlineAccessTime className={s.featureIcon} />
            <h3>Fast platform</h3>
            <p>Описание преимущества...</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className={s.feature}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            <AiOutlineTool className={s.featureIcon} />
            <h3>Best feature</h3>
            <p>Описание преимущества...</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className={s.feature}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            <BiSignal3 className={s.featureIcon} />
            <h3>Frequent updates</h3>
            <p>Описание преимущества...</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className={s.textWrapper}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
      >
        <div className={s.contentContainer}>
          <div className={s.textBlock}>
            <motion.div
              className={s.textBlockContent}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.p
                className={s.textTitle}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
              >
                THE HIDDEN FRICTION
              </motion.p>

              <motion.h1
                style={{ fontSize: 28 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
                }}
              >
                Workflow slowdowns are rarely obvious. <br />
                Friction builds quietly over time.
              </motion.h1>

              <motion.p
                className={s.textP}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
                }}
              >
                Most managers believe delays happen instantly because <br />
                of one confusing interface or a single missing task. The reality is uncomfortable:
                <br />
                small inefficiencies are scattered and accumulate subtly.
              </motion.p>

              <motion.p
                className={s.textP}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
                }}
              >
                Our CRM is designed to make every action simple and visible. <br />
                By the time you notice tasks piling up, our interface <br />
                has already kept your workflow smooth.
              </motion.p>

              <motion.h5
                className={s.fcb}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
                }}
              >
                FlowCRM bridges this gap. We give you clarity and control over your processes, so
                small issues never become big problems.
              </motion.h5>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
