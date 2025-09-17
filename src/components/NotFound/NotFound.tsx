import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.notFound}>
      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__title}>{t('errors.pageNotFound')}</h1>
        <img
          src="img/page-not-found.png"
          alt="Page not found photo"
          className={styles.notFound__photo}
        />
        <Link to="/" className={styles.notFound__link}>
          {t('nav.backToHome')}
        </Link>
      </div>
    </section>
  );
};
