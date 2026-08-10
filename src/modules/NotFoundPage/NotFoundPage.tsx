import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <h1>{t('notFound.title')}</h1>
      <Link to="/">{t('notFound.home')}</Link>
    </div>
  );
};
