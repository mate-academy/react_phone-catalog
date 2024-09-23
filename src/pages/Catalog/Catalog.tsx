import styles from './Catalog.module.scss';

import { NavLink, useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/fetch';
import { Products } from '../../utils/types';

export const Catalog = () => {
  const [displayedProducts, setDisplayedProducts] = useState<Products[] | []>(
    [],
  );
  const { category } = useParams();
  // #region functions
  const getTitleName = (currentCategory: string) => {
    switch (currentCategory) {
      case 'phones':
        return 'Phones page';
      case 'tablets':
        return 'Tablets page';
      case 'accessories':
        return 'Accessories page';
      default:
        return '';
    }
  };

  //  #endregion
  const pageTitle = category ? getTitleName(category) : '';

  useEffect(() => {
    if (category) {
      fetchProducts(category).then(res => {
        setDisplayedProducts(res);
      });
    }
  }, [category]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__navigation}>
        <NavLink to={'/'} style={{ display: 'block' }}>
          <img
            style={{ display: 'block' }}
            src="../src/img/icons/home.png"
            alt="home icon"
          />
        </NavLink>
        <img src="./src/img/icons/arrow_right_grey.png" alt="arrow icon" />
        <p className={styles['catalog__current-page']}>{category}</p>
      </div>
      <div className={styles.catalog__title}>
        <Title level={1}>{pageTitle}</Title>
      </div>
      <p
        className={styles.catalog__quantity}
      >{`${displayedProducts.length} models`}</p>
    </div>
  );
};
