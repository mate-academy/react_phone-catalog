import styles from './Breadcrumbs.module.scss';
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const [productName, setProductName] = useState<string>('');

  const getCategory = () => {
    if (location.pathname.includes('/phones')) return 'phones';
    if (location.pathname.includes('/tablets')) return 'tablets';
    if (location.pathname.includes('/accessories')) return 'accessories';
    if (location.pathname.includes('/favourites')) return 'Favourites';
    return null;
  };

  const category = getCategory();

  if (location.pathname.includes('/cart')) {
    return (
      <div className={styles.breadcrumbs__back}>
        <NavLink to={`/${category ?? ''}`} className={styles.breadcrumbs__back__arrow}>
          &lt;
        </NavLink>

        <NavLink to={`/${category ?? ''}`} className={styles.breadcrumbs__back__text}>
          Back
        </NavLink>
      </div>
    );
  }


  if (!category) return null;

  return (
    <div className={styles.breadcrumbs}>
      <NavLink to="/" className={styles.breadcrumbs__home}></NavLink>
      <p className={styles['breadcrumbs--arrow']}>&gt;</p>

      <NavLink
        to={`/${category}`}
        className={styles.breadcrumbs__name}
        style={productId && productName ? { color: '#F1F2F9' } : {}}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </NavLink>

      {productId && productName && (
        <>
          <p className={styles['breadcrumbs--arrow']}>&gt;</p>
          <p className={styles.breadcrumbs__name}>{productName}</p>
        </>
      )}
    </div>
  );
};
