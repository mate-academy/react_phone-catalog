import React from 'react';
import styles from './category.module.scss';
import phones from '../../../assets/images/category/phones.png';
import tablets from '../../../assets/images/category/tablets.png';
import accessories from '../../../assets/images/category/accessories.png';
import classNames from 'classnames';

export const Category: React.FC = () => {
  return (
    <section className={classNames(styles.category, 'container')}>
      <h2 className={styles.category_title}>Shop by category</h2>
      <ul className={styles.category_list}>
        <li>
          <a href="/" className={styles.category_mobile}>
            <img src={phones} alt="phones" className={styles.category_img} />
          </a>

          <p className={styles.category_name}>Mobile phones</p>
          <p className={styles.category_quan}>0 models</p>
        </li>
        <li>
          <a href="/" className={styles.category_tablets}>
            <img src={tablets} alt="tablets" className={styles.category_img} />
          </a>

          <p className={styles.category_name}>Tablets</p>
          <p className={styles.category_quan}>0 models</p>
        </li>
        <li>
          <a href="/" className={styles.category_accessories}>
            <img
              src={accessories}
              alt="accessories"
              className={styles.category_img}
            />
          </a>

          <p className={styles.category_name}>Accessories</p>
          <p className={styles.category_quan}>0 models</p>
        </li>
      </ul>
    </section>
  );
};
