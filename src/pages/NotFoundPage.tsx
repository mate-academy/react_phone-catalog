import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../utils/i18n/translations';
import gStyles from '../styles/general.module.scss';
import styles from '../styles/notFound.module.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className={gStyles.heroTitle}>
        {t(TRANSLATIONS.error.notFound.title)}
      </h1>
      <section className={styles.block}>
        <div className={`${styles.bg} ${styles.bg_m_page}`}></div>
      </section>
    </>
  );
};
