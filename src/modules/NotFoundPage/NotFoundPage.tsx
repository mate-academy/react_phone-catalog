import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found__content']}>
        <h1 className={styles['not-found__title']}>
          {t('notFound.pageTitle', '404 - Page not found')}
        </h1>
        <p className={styles['not-found__description']}>
          {t(
            'notFound.pageDescription',
            "The page you are looking for doesn't exist or has been moved.",
          )}
        </p>
        <Link to="/" className={styles['not-found__button']}>
          {t('notFound.backToHome', 'Back to Home')}
        </Link>
      </div>
    </div>
  );
};
