import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Product } from '../../types/product';

type Props = {
  product?: Product;
};

export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean); // очищає порожні елементи
  const category = pathSegments[0]; // перший сегмент після "/"

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (!product) {
    return (
      <div className={styles.breadcrumbs}>
        <Link to={`/`}>
          <img src="/icons/home.svg" alt="home" />
        </Link>
        <img src="/icons/arrow-right.svg" alt="path" />
        <Link to={`/${category}`}>
          <p className={styles.text}>{capitalize(category)}</p>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/`}>
        <img src="/icons/home.svg" alt="home" />
      </Link>
      <img src="/icons/arrow-right.svg" alt="path" />
      <Link to={`/${product.category}`}>
        <p className={styles.category}>{capitalize(product.category)}</p>
      </Link>
      <img src="/icons/arrow-right.svg" alt="path" />
      <p className={styles.text}>{product.name}</p>
    </div>
  );
};
