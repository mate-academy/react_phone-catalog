import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const t = useT();
  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>{t('notFound.text')}</p>
      <Link to="/" className={styles.link}>
        {t('product.backToHome')}
      </Link>
    </div>
  );
};
