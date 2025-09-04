import React, { useEffect, useMemo, useState } from 'react';
import styles from './Category.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/products';

export const Category = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  type ModelsCount = {
    phones: number;
    tablets: number;
    accessories: number;
  };

  const modlesCount = useMemo(() => {
    const acc: ModelsCount = {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };

    for (const product of products) {
      if (product.category in acc) {
        acc[product.category as keyof ModelsCount]++;
      }
    }

    return acc;
  }, [products]);

  return (
    <section className={styles.category}>
      <div className={styles.container}>
        <h2 className={styles.category__title}>Shop by category</h2>
        <ul className={styles.category__list}>
          <li className={styles.category__item}>
            <Link className={styles.category__link} to="/phones">
              <div
                className={classNames(
                  styles.category__imageBox,
                  styles.category__imageBoxPhones,
                )}
              >
                <img
                  className={styles.category__image}
                  src="img/category-phones.webp"
                  alt=""
                />
              </div>
              <h3 className={styles.category__name}>Mobile phones</h3>
              <span className={styles.category__models}>
                {modlesCount.phones} models
              </span>
            </Link>
          </li>
          <li className={styles.category__item}>
            <Link className={styles.category__link} to="/tablets">
              <div
                className={classNames(
                  styles.category__imageBox,
                  styles.category__imageBoxTablets,
                )}
              >
                <img
                  className={styles.category__image}
                  src="img/category-tablets.png"
                  alt=""
                />
              </div>
              <h3 className={styles.category__name}>Tablets</h3>
              <span className={styles.category__models}>
                {modlesCount.tablets} models
              </span>
            </Link>
          </li>
          <li className={styles.category__item}>
            <Link className={styles.category__link} to="/accessories">
              <div
                className={classNames(
                  styles.category__imageBox,
                  styles.category__imageBoxAccessories,
                )}
              >
                <img
                  className={styles.category__image}
                  src="img/category-accessories.png"
                  alt=""
                />
              </div>
              <h3 className={styles.category__name}>Accessories</h3>
              <span className={styles.category__models}>
                {modlesCount.accessories} models
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
