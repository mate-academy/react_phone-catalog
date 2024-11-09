import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';
import phones from '../../images/category/phones.png';
import tablets from '../../images/category/tablets.png';
import accessories from '../../images/category/accessories.png';

export const ShopByCategory = () => {
  return (
    <React.Fragment>
      <h2 className={styles.category__title}>Shop by category</h2>
      <div className={styles.category__container}>
        <Link to="/phones" className={styles.category__link}>
          <div>
            <img src={phones} alt="Phones" className={styles.category__image} />
            <h4 className={styles.category__name}>Mobile phones</h4>
            <p className={styles.category__amount}>models</p>
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
            <p className={styles.category__amount}>models</p>
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
            <p className={styles.category__amount}>models</p>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};
