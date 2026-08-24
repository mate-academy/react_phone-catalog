import { usePageName } from '../../hooks/usePageName';
import { Link, NavLink, useParams } from 'react-router-dom';
import styles from '../ProductNavigation/productNavigation.module.scss';

import products from '../../../public/api/products.json';

export const ProductNavigation = () => {
  const { pageName, pathname } = usePageName();
  const { productId } = useParams();

  const product = products.find(item => item.itemId === productId);

  return (
    <div className={styles.navigation}>
      <Link to="/" className={styles.navigation__icon}>
        <img
          className={styles.navigation__img}
          src={`${import.meta.env.BASE_URL}/img/icons/Home.svg`}
          alt="icon home"
        />
        <img
          className={styles.navigation__imgDark}
          src={`${import.meta.env.BASE_URL}/img/icons-dark/Home.svg`}
          alt="icon home"
        />
      </Link>
      <img
        className={styles.navigation__img}
        src={`${import.meta.env.BASE_URL}/img/icons/disabled-arrow-right.svg`}
        alt="arrow rigth"
      />
      <img
        className={styles.navigation__imgDark}
        src={`${import.meta.env.BASE_URL}/img/icons-dark/Disabled-arrow-right.svg`}
        alt="arrow rigth"
      />
      <NavLink
        to={`/${pathname.split('/')[1]}`}
        end
        className={({ isActive }) =>
          `${styles.navigation__title} ${isActive ? styles.active : ''}`
        }
      >
        {pageName}
      </NavLink>

      {productId && (
        <>
          <img
            className={styles.navigation__img}
            src={`${import.meta.env.BASE_URL}/img/icons/disabled-arrow-right.svg`}
            alt="arrow rigth"
          />
          <img
            className={styles.navigation__imgDark}
            src={`${import.meta.env.BASE_URL}/img/icons-dark/Disabled-arrow-right.svg`}
            alt="arrow rigth"
          />
          <p className={styles.navigation__product}>{product?.name}</p>
        </>
      )}
    </div>
  );
};
