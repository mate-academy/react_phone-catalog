import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';

type Props = {
  title?: string;
};

export const NotFoundPage = ({ title }: Props) => {
  const { t } = useTranslation();
  const pageTitle = title ?? t('notFound.title');

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <Link to="/" className={styles.homeLink}>
          <img
            src="/img/Home_breadcrumb.svg"
            alt={t('icons.homeAlt')}
            className={styles.homeIcon}
          />
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  );
};
