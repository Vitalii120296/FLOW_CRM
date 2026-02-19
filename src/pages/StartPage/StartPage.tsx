import s from './StartPage.module.scss'
import cn from 'classnames'

import { BiLockOpenAlt } from 'react-icons/bi'
import { MdOutlineAccessTime } from 'react-icons/md'
import { BiSignal3 } from 'react-icons/bi'
import { AiOutlineTool } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

import { FiDatabase } from 'react-icons/fi'
import { LuSquareKanban } from 'react-icons/lu'
import { FaRegComment } from 'react-icons/fa'
import { LuShoppingCart } from 'react-icons/lu'
import { GrUserManager } from 'react-icons/gr'
import { BsBriefcase } from 'react-icons/bs'
import { IoPieChart } from 'react-icons/io5'

import { FaGithub } from 'react-icons/fa'

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
              className={s.startInfoAbout}
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
                src="kanban.png"
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
            <p className={s.featureAbout}>High-speed performance for seamless user experience</p>
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
            <p className={s.featureAbout}>Powerful tools designed for maximum productivity</p>
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
            <p className={s.featureAbout}>Regular updates with new features and improvements</p>
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

      <section className={s.advantagesWrapper}>
        <div className={s.contentContainer}>
          <h1 className={s.advantagesTitle}>ADVANTAGES</h1>

          <motion.div
            className={s.advantagesBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              className={`${s.advantages} ${s.red}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <FiDatabase className={s.advantagesIcon} />
              </div>
              <h1>Database of all clients</h1>
              <p>Easily store and access detailed client information in one secure place.</p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.blue}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <LuSquareKanban className={s.advantagesIcon} />
              </div>
              <h1>Kanban Management</h1>
              <p>Organize tasks visually and track workflow efficiently for all team members.</p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.green}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <IoIosCheckmarkCircleOutline className={s.advantagesIcon} />
              </div>
              <h1>Client statuses</h1>
              <p>Quickly see each client’s stage and progress through your sales pipeline.</p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.orange}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <FaRegComment className={s.advantagesIcon} />
              </div>
              <h1>Custom comments and notes</h1>
              <p>Add detailed notes or comments for each client individually.</p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.purple}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <LuShoppingCart className={s.advantagesIcon} />
              </div>
              <h1>Adding products and linking them to clients</h1>
              <p>
                Manage product lists and associate items directly with individual clients easily.
              </p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.teal}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <GrUserManager className={s.advantagesIcon} />
              </div>
              <h1>Manager management</h1>
              <p>
                Assign roles, monitor activity, and manage your team effectively from one place.
              </p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.pink}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <BsBriefcase className={s.advantagesIcon} />
              </div>
              <h1>Company data configuration</h1>
              <p>Set up company details, policies, and settings to suit your business needs.</p>
            </motion.div>

            <motion.div
              className={`${s.advantages} ${s.yellow} ${s.noHover}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              <div className={s.advantagesIconWrapper}>
                <IoPieChart className={s.advantagesIcon} />
              </div>
              <h1>Data monitoring</h1>
              <p>Coming Soon...</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.contentContainer}>
          <div className={s.footerContent}>
            <div className={s.logoBlock}>
              <div className={s.flow}>FLOW</div>
              <div className={s.crm}>
                <span style={{ color: '#a9dfd8' }}>C</span>
                <span style={{ color: '#f2c8ed' }}>R</span>
                <span style={{ color: '#f2994a' }}>M</span>
              </div>
            </div>

            <div className={s.createdBy}>
              <a
                href="https://github.com/Moddderi"
                target="_blank"
                rel="noopener noreferrer"
                className={s.gitIcons}
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://github.com/Vitalii120296"
                target="_blank"
                rel="noopener noreferrer"
                className={s.gitIcons}
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://github.com/01https"
                target="_blank"
                rel="noopener noreferrer"
                className={s.gitIcons}
              >
                <FaGithub size={22} />
              </a>
            </div>
          </div>

          <p className={s.footerPrivacy}>
            © {new Date().getFullYear()} FLOW CRM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
