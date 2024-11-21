import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';
import phones from '../../images/category/phones.png';
import tablets from '../../images/category/tablets.png';
import accessories from '../../images/category/accessories.png';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { handleClickToTop } from '../../helpers/scrollToTop';

export const ShopByCategory = () => {
  const { products } = useContext(ProductsContext);
  const phonesAmount = getProductsByCategory(products, 'phones').length;
  const tabletsAmount = getProductsByCategory(products, 'tablets').length;
  const accesAmount = getProductsByCategory(products, 'accessories').length;

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  useEffect(() => {
    if (nameOfPath) {
      handleClickToTop();
    }
  }, [nameOfPath]);

  return (
    <React.Fragment>
      <h2 className={styles.category__title}>Shop by category</h2>
      <div className={styles.category__container}>
        <Link to="/phones" className={styles.category__link}>
          <div>
            <img src={phones} alt="Phones" className={styles.category__image} />
            <h4 className={styles.category__name}>Mobile phones</h4>
            <p className={styles.category__amount}>
              {`${phonesAmount} models`}
            </p>
          </div>
        </Link>
        <Link to="/tablets" className={styles.category__link}>
          <div>
            <img
              src={tablets}
              alt="Tablets"
              className={styles.category__image}
            />
            <h4 className={styles.category__name}>Tablets</h4>
            <p className={styles.category__amount}>
              {`${tabletsAmount} models`}
            </p>
          </div>
        </Link>
        <Link to="/accessories" className={styles.category__link}>
          <div>
            <img
              src={accessories}
              alt="Accessories"
              className={styles.category__image}
            />
            <h4 className={styles.category__name}>Accessories</h4>
            <p className={styles.category__amount}>{`${accesAmount} models`}</p>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};
