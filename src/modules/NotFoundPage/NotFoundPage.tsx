import { Link } from 'react-router-dom';
import { useTranslation } from '@shared/context';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('notFound.title')}</h1>

      <img
        src="img/page-not-found.png"
        alt={t('notFound.title')}
        className={styles.image}
      />

      <Link to="/" className={styles.homeLink}>
        {t('notFound.goHome')}
      </Link>
    </div>
  );
};
