import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/getAssetUrl';
import styles from './Breadcrumbs.module.scss';

interface Props {
  category?: string;
  productName?: string;
}

export const Breadcrumbs = ({ category, productName }: Props) => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <img src={getAssetUrl('/img/home.png')} alt="Home" />
      </Link>

      {category && (
        <>
          <img
            src={getAssetUrl('/img/arrow-right.png')}
            alt=">"
            className={styles.divider}
          />
          {productName ? (
            <Link to={`/${category}`} className={styles.link}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ) : (
            <span className={styles.current}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}
        </>
      )}

      {productName && (
        <>
          <img
            src={getAssetUrl('/img/arrow-right.png')}
            alt=">"
            className={styles.divider}
          />
          <span className={styles.current}>{productName}</span>
        </>
      )}
    </nav>
  );
};
