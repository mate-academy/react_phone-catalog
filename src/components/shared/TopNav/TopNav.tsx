import { Link } from 'react-router-dom';
import styles from './TopNav.module.scss';
import { Categories } from '../../../types/Categories';

type Props = {
  category?: Categories;
  productName?: string;
};

export const TopNav: React.FC<Props> = ({ category, productName }) => {
  return (
    <div className={styles.topNavWrapper}>
      <nav className={styles.topNav}>
        <Link to="/" className={styles.topNav__homeIcon} />
        <span className={styles.topNav__arrRight} />

        {!category && !productName && (
          <span className={styles.topNav__product}>Favorites</span>
        )}
        {category && (
          <Link to={`/${category}`} className={styles.topNav__link}>
            {category.charAt(0).toLocaleUpperCase() + category.slice(1)}
          </Link>
        )}

        {productName && (
          <>
            <span className={styles.topNav__arrRight} />
            <span className={styles.topNav__product}>{productName}</span>
          </>
        )}
      </nav>

      {productName && (
        <div className={styles.topNav__backWrapper}>
          <Link to={`/${category}`} className={styles.topNav__back}>
            <span className={styles.topNav__arrLeft} /> Back
          </Link>
        </div>
      )}
    </div>
  );
};
