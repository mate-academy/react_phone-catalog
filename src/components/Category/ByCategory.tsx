import React from 'react';
import styles from './ByCategory.module.scss';
import products from '../../../public/api/products.json';

import PhonesPic from '../../../public/img/phones-category.png';
import TabletPic from '../../../public/img/tablets-category.png';
import AccessoriesPic from '../../../public/img/accessories-category.png';
import { NavLink } from 'react-router-dom';

const phones = products.filter(product => product.category === 'phones');
const tablets = products.filter(product => product.category === 'tablets');
const accessories = products.filter(product => product.category === 'accessories');

export const ByCategory: React.FC = () => {
  return (
    <div className={styles.categories}>
      <h2>Shop by category</h2>
      <div className={styles.categories__container}>
        <NavLink to="/phones" className={styles.categories__item}>
          <div className={styles.categories__item__image__phones}>
            <img src={PhonesPic} alt="Mobile Phones" className={styles.categories__item__image} />
          </div>
          <p className={styles.categories__item__name}>Mobile phones</p>
          <p className={styles.categories__item__quantity}>{phones.length} models</p>
        </NavLink>

        <NavLink to="/tablets" className={styles.categories__item}>
          <div className={styles.categories__item__image__tablets}>
            <img src={TabletPic} alt="Tablets" className={styles.categories__item__image} />
          </div>
          <p className={styles.categories__item__name}>Tablets</p>
          <p className={styles.categories__item__quantity}>{tablets.length} models</p>
        </NavLink>

        <NavLink to="/accessories" className={styles.categories__item}>
          <div className={styles.categories__item__image__accessories}>
            <img src={AccessoriesPic} alt="Accessories" className={styles.categories__item__image} />
          </div>
          <p className={styles.categories__item__name}>Accessories</p>
          <p className={styles.categories__item__quantity}>{accessories.length} models</p>
        </NavLink>
      </div>
    </div>
  )
}
