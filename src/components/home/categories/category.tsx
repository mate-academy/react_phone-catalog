import React from 'react';
import styles from './category.module.scss';
import phonesImg from '../../../assets/images/category/phones.png';
import tabletsImg from '../../../assets/images/category/tablets.png';
import accessoriesImg from '../../../assets/images/category/accessories.png';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Link } from 'react-router-dom';

export const Category: React.FC = () => {
  const phones = useSelector((state: RootState) => state.products.items).filter(
    product => product.category === 'phones',
  );
  const tablets = useSelector(
    (state: RootState) => state.products.items,
  ).filter(product => product.category === 'tablets');

  const accessories = useSelector(
    (state: RootState) => state.products.items,
  ).filter(product => product.category === 'accessories');

  return (
    <section className={classNames(styles.category, 'container')}>
      <h2 className={styles.category_title}>Shop by category</h2>
      <ul className={styles.category_list}>
        <li>
          <Link to="phones" className={styles.category_mobile}>
            <img src={phonesImg} alt="phones" className={styles.category_img} />
          </Link>

          <p className={styles.category_name}>Mobile phones</p>
          <p className={styles.category_quan}>{phones.length} models</p>
        </li>
        <li>
          <Link to="tablets" className={styles.category_tablets}>
            <img
              src={tabletsImg}
              alt="tablets"
              className={styles.category_img}
            />
          </Link>

          <p className={styles.category_name}>Tablets</p>
          <p className={styles.category_quan}>{tablets.length} models</p>
        </li>
        <li>
          <Link to="accessories" className={styles.category_accessories}>
            <img
              src={accessoriesImg}
              alt="accessories"
              className={styles.category_img}
            />
          </Link>

          <p className={styles.category_name}>Accessories</p>
          <p className={styles.category_quan}>{accessories.length} models</p>
        </li>
      </ul>
    </section>
  );
};
