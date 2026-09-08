import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { Product } from '../../types/product';
import { arrow_right, home_icon } from '../../assets/images';

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
          <img src={home_icon} alt="home" />
        </Link>
        <img src={arrow_right} alt="path" />
        <Link to={`/${category}`}>
          <p className={styles.text}>{capitalize(category)}</p>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.breadcrumbs}>
      <Link to={`/`}>
        <img src={home_icon} alt="home" />
      </Link>
      <img src={arrow_right} alt="path" />
      <Link to={`/${product.category}`}>
        <p className={styles.category}>{capitalize(product.category)}</p>
      </Link>
      <img src={arrow_right} alt="path" />
      <p className={styles.text}>{product.name}</p>
    </div>
  );
};
