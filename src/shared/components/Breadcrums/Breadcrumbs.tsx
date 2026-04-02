import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import type { ProductDetails } from '../../../types';

type Props = {
  product?: ProductDetails;
};

export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const location = useLocation();

  const path = location.pathname.split('/')[1];

  if (!path) {
    return null;
  }

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">
        <img src="/img/home.png" alt="home" className={styles.homeIcon} />
      </Link>
      {!product && path && (
        <>
          <span className={styles.separator}>{'>'}</span>
          <span className={styles.current}>
            {' '}
            {path[0].toUpperCase() + path.slice(1)}
          </span>
        </>
      )}
      {product && (
        <>
          <span className={styles.separator}>{'>'}</span>
          <Link to={`/${product.category}`} className={styles.link}>
            {product.category[0].toUpperCase() + product.category.slice(1)}
          </Link>
          <span className={styles.separator}>{'>'}</span>
          <span className={styles.current}>{product.name}</span>
        </>
      )}
    </div>
  );
};
