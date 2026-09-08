import React from 'react';
import styles from './Categorys.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { TypeProduct } from '../../../../types/category';

const Categorys = () => {
  const products = useAppSelector(state => state.store.products);
  const countModels = {
    phones: products.filter(el => el.category === TypeProduct.phones).length,
    tablets: products.filter(el => el.category === TypeProduct.tablets).length,
    accessories: products.filter(el => el.category === TypeProduct.accessories)
      .length,
  };

  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>
      <ul className={styles.category__content}>
        <li className={styles.category__item}>
          <Link to="phones" className={styles.category__link}>
            <div className={styles.category__img}>
              <img src="img/category-phones.webp" alt="phones" />
            </div>
            <p className={styles.category__name}>Mobile phones</p>
            <p
              className={styles.category__count}
            >{`${countModels.phones} models`}</p>
          </Link>
        </li>

        <li className={styles.category__item}>
          <Link to="tablets" className={styles.category__link}>
            <div className={styles.category__img}>
              <img src="img/category-tablets.webp" alt="tablets" />
            </div>
            <p className={styles.category__name}>Tablets</p>
            <p
              className={styles.category__count}
            >{`${countModels.tablets} models`}</p>
          </Link>
        </li>

        <li className={styles.category__item}>
          <Link to="accessories" className={styles.category__link}>
            <div className={styles.category__img}>
              <img src="img/category-accessories.webp" alt="accessories" />
            </div>
            <p className={styles.category__name}>Accessories</p>
            <p
              className={styles.category__count}
            >{`${countModels.accessories} models`}</p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Categorys;
