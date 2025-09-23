import { Link, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  productName: string | undefined;
};

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  const getLink = () => {
    switch (category) {
      case 'phones':
        return { path: '/phones', label: 'Phones' };
      case 'tablets':
        return { path: '/tablets', label: 'Tablets' };
      case 'accessories':
        return { path: '/accessories', label: 'Accessories' };
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
              className="breadcrumbs__img"
              src="/img/icons/home.svg"
              alt="Home icon"
            />
          </Link>
        </li>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__link} to={path}>
            {label}
          </Link>
        </li>
        {productId && (
          <li className={styles['breadcrumbs__item-id']}>{productName}</li>
        )}
      </ul>
    </div>
  );
};
