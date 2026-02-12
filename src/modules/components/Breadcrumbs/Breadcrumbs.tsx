import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ProductData } from '@models/ProductData';
import homePage from '@img/icons/home-page.svg';
import homePageBlack from '@img/icons/home-page-black.svg';
import arrow from '@img/icons/breadcrumbs-arrow.svg';
import styles from './Breadcrumbs.module.scss';

type Props = {
  product: ProductData | null;
  isLightMode: boolean;
};

const searchLocation = (pathname: string) => {
  if (pathname.includes('/phones')) {
    return 'Phones';
  } else if (pathname.includes('/tablets')) {
    return 'Tablets';
  } else if (pathname.includes('/accessories')) {
    return 'Accessories';
  } else if (pathname.includes('/Favourite')) {
    return 'Accessories';
  } else if (pathname.includes('/cart')) {
    return 'Cart';
  } else if (pathname.includes('/favourites')) {
    return 'Favourites';
  } else {
    return '';
  }
};

export const Breadcrumbs: React.FC<Props> = ({ product, isLightMode }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const category = searchLocation(pathname);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/home" className={styles.breadcrumbs__icon}>
        <img
          className={styles.breadcrumbs__image}
          src={!isLightMode ? homePage : homePageBlack}
          alt="Home"
        />
      </Link>
      <div className={styles.breadcrumbs__icon}>
        <img
          className={styles.breadcrumbs__image}
          src={arrow}
          alt="Breadcrumbs-arrow"
        />
      </div>
      <div>
        <Link
          to={`/${category.toLowerCase()}`}
          className={classNames(styles.breadcrumbs__title, {
            [styles['breadcrumbs__title--white']]: product,
          })}
        >
          {category}
        </Link>
      </div>
      {product && (
        <>
          <div className={styles.breadcrumbs__icon}>
            <img
              className={styles.breadcrumbs__image}
              src={arrow}
              alt="Breadcrumbs-arrow"
            />
          </div>
          <div>
            <span className={styles.breadcrumbs__title}>{product.name}</span>
          </div>
        </>
      )}
    </div>
  );
};
