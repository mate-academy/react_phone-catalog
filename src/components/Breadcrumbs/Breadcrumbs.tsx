import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './Breadcrumbs.module.scss';

interface Props {
  currentPage: string;
  productName?: string;
  categoryPath?: string;
}

export const Breadcrumbs: React.FC<Props> = ({
  currentPage,
  productName,
  categoryPath,
}) => {
  const { t } = useLanguage();

  return (
    <nav className={styles.breadcrumbs} aria-label={t('breadcrumb.label')}>
      <Link to="/" className={styles.homeLink} aria-label={t('common.home')}>
        <img
          src={getPublicPath('img/icon-home.svg')}
          alt=""
          aria-hidden="true"
        />
      </Link>

      <span className={styles.chevronBox}>
        <img
          src={getPublicPath('img/chevron-right.svg')}
          alt=""
          aria-hidden="true"
          className={styles.chevron}
        />
      </span>

      {productName && categoryPath ? (
        <Link to={categoryPath} className={styles.categoryLink}>
          {currentPage}
        </Link>
      ) : (
        <span className={styles.currentPage}>{currentPage}</span>
      )}

      {productName && (
        <>
          <span className={styles.chevronBox}>
            <img
              src={getPublicPath('img/chevron-right.svg')}
              alt=""
              aria-hidden="true"
              className={styles.chevron}
            />
          </span>

          <span className={styles.productName}>{productName}</span>
        </>
      )}
    </nav>
  );
};
