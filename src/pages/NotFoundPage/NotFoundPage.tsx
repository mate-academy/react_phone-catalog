import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.numbers}>
        <motion.span
          className={styles.number}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          4
        </motion.span>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <motion.img
            src="./img/page-not-found.png"
            alt="404 cat"
            className={styles.image}
            animate={{ rotate: [0, -3, 3, -3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.div>

        <motion.span
          className={styles.number}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          4
        </motion.span>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <p className={styles.description}>{t('notFound.description')}</p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link to="/" className={styles.button}>
            {t('notFound.button')}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
