import React, { useEffect, useMemo, useState } from 'react';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../../shared/types/Product';
import { getProducts } from '../../../shared/utils/api';
import { Link } from 'react-router-dom';
import { CategoryName } from '../../../shared/enums/categoryName';

export const ShopByCategory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(fetchedProducts => setProducts(fetchedProducts));
  }, [products]);

  const { phonesLength, tabletsLength, accessoriesLength } = useMemo(() => {
    const phones = [];
    const tablets = [];
    const accessories = [];

    products.forEach(product => {
      if (product.category === 'phones') {
        phones.push(product.id);
      }

      if (product.category === 'tablets') {
        tablets.push(product.id);
      }

      if (product.category === 'accessories') {
        accessories.push(product.id);
      }
    });

    return {
      phonesLength: phones.length,
      tabletsLength: tablets.length,
      accessoriesLength: accessories.length,
    };
  }, [products]);

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__content}>
        <Link to="/phones" className={styles.categories__link}>
          <div className={styles['categories__block-wrapper']}>
            <img
              src="./img/category-phones.webp"
              alt="Category phones"
              className={styles['categories__block-wrapper-img']}
            />
          </div>
          <h4 className={styles['categories__block-title']}>
            {CategoryName.PHONES}
          </h4>
          <span
            className={styles['categories__block-desc']}
          >{`${phonesLength} models`}</span>
        </Link>
        <Link to="/tablets" className={styles.categories__link}>
          <div className={styles.categories__block}>
            <div className={styles['categories__block-wrapper']}>
              <img
                src="./img/category-tablets.webp"
                alt="Category phones"
                className={styles['categories__block-wrapper-img']}
              />
            </div>
            <h4 className={styles['categories__block-title']}>
              {CategoryName.TABLETS}
            </h4>
            <span
              className={styles['categories__block-desc']}
            >{`${tabletsLength} models`}</span>
          </div>
        </Link>
        <Link to="/accessories" className={styles.categories__link}>
          <div className={styles.categories__block}>
            <div className={styles['categories__block-wrapper']}>
              <img
                src="./img/category-accessories.png"
                alt="Category phones"
                className={styles['categories__block-wrapper-img']}
              />
            </div>
            <h4 className={styles['categories__block-title']}>
              {CategoryName.ACCESSORIES}
            </h4>
            <span
              className={styles['categories__block-desc']}
            >{`${accessoriesLength} models`}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
