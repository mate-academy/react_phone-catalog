import { Link, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { ProductDetails } from '../../types/ProductsDetails';

type Props = {
  category: string;
  product: ProductDetails | null;
};

export const Breadcrumbs: React.FC<Props> = ({ category, product }) => {
  const getLink = () => {
    switch (category) {
      case 'phones':
        return { path: '/phones', label: 'Phones' };
      case 'tablets':
        return { path: '/tablets', label: 'Tablets' };
      case 'accessories':
        return { path: '/accessories', label: 'Accessories' };
      case 'favorites':
        return { path: '/favorites', label: 'Favourites' };
      default:
        return { path: '/', label: 'Home' };
    }
  };

  const { path, label } = getLink();
  const { productId } = useParams();

  return (
    <div className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__link} to="/">
            <img
              className={styles.breadcrumbs__img}
              src="./img/icons/home.svg"
              alt="Home icon"
            />
          </Link>
        </li>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__link} to={path}>
            {label}
          </Link>
        </li>
        {productId ? (
          product ? (
            <li className={styles['breadcrumbs__item-id']}>{product.name}</li>
          ) : (
            <li className={styles['breadcrumbs__item-id']}>
              Product wasn’t found
            </li>
          )
        ) : null}
      </ul>
    </div>
  );
};
