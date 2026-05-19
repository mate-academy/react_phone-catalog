import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
  category: string;
  productName?: string;
}

export const Breadcrumbs = ({ category, productName }: Props) => {
  const formatCategory = (str: string) => {
    if (!str) {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__link}>
        <img
          src="./img/home.png"
          alt="Home"
          className={styles.breadcrumbs__icon}
        />
      </Link>

      {category && (
        <>
          <img
            src="./img/arrow-right.png"
            alt=">"
            className={styles.breadcrumbs__divider}
          />
          {productName ? (
            <Link
              to={`/${category.toLowerCase()}`}
              className={styles.breadcrumbs__link}
            >
              {formatCategory(category)}
            </Link>
          ) : (
            <span className={styles.breadcrumbs__current}>
              {formatCategory(category)}
            </span>
          )}
        </>
      )}

      {productName && (
        <>
          <img
            src="./img/arrow-right.png"
            alt=">"
            className={styles.breadcrumbs__divider}
          />
          <span className={styles.breadcrumbs__current}>{productName}</span>
        </>
      )}
    </nav>
  );
};
