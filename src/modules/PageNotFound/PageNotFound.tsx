import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.scss';
import { useTranslation } from 'react-i18next';

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('Page not found')}</h1>

      <img
        className={styles.img}
        src="/img/page-not-found.png"
        alt="page not found"
      />

      <Link to="/" className={styles.button}>
        {t('Return to the home page')}
      </Link>
    </div>
  );
};
