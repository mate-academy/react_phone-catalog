//#region imports
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../shared/hooks/useTheme';
import { capitalizeFirstWord } from '../../services/capitalizeFirstWord';
import styles from './NotFoundPage.module.scss';
//#endregion

export const NotFoundPage = () => {
  const { t } = useTranslation('notFoundPage');
  const { isDark } = useTheme();

  const imgSrc = isDark
    ? '/img/darkTheme/page-not-found.png'
    : '/img/page-not-found.png';

  return (
    <section className={styles.notFoundPage} aria-label={t('pageNotFound')}>
      <h1>{t('pageNotFound')}</h1>

      <img src={imgSrc} alt={t('pageNotFound')} className={styles.image} />

      <Link to="/" className={styles.homeLink}>
        {capitalizeFirstWord(t('goToHomePage'))}
      </Link>
    </section>
  );
};
