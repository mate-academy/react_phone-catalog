import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductNotFoundPage.module.scss';

export const ProductNotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.imageWrapper}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.img
          src="/img/product-not-found.png"
          alt="Product not found"
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

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className={styles.title}>{t('productNotFound.title')}</h1>
        <p className={styles.description}>{t('productNotFound.description')}</p>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <button
            type="button"
            onClick={handleGoBack}
            className={styles.button}
          >
            {t('productNotFound.button')}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
