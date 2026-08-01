import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Category.module.scss';
import { getProductsFromApi } from '../../../shared/utils/api';
import { Products } from '../../../shared/types/Products';

export const Category = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProductsFromApi().then(goods => {
      setProducts(goods);
    });
  }, []);

  const phoneCount = products.filter(good => good.category === 'phones').length;
  const tabletCount = products.filter(
    good => good.category === 'tablets',
  ).length;
  const accsessoriesCount = products.filter(
    good => good.category === 'accessories',
  ).length;

  return (
    <div className={styles.categoryWrapper}>
      <h2>Shop by category</h2>
      <div className={styles.category}>
        <Link to="phones" className={styles.categoryInfo}>
          <div className={classNames('block', styles.block, styles.phone)}>
            <img
              src={`${import.meta.env.BASE_URL}/img/category-phones.webp`}
              alt=""
              className={styles.blockPhone}
            />
          </div>
          <p className={styles.title}>Mobile phones</p>
          <p className={styles.count}>{phoneCount} models</p>
        </Link>

        <Link to="tablets" className={styles.categoryInfo}>
          <div className={classNames('block', styles.block, styles.tablets)}>
            <img
              src={`${import.meta.env.BASE_URL}/img/category-tablets.png`}
              alt=""
              className={styles.blockTablets}
            />
          </div>
          <p className={styles.title}>Tablets</p>
          <p className={styles.count}>{tabletCount} models</p>
        </Link>

        <Link to="accessories" className={styles.categoryInfo}>
          <div
            className={classNames('block', styles.block, styles.accessories)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/category-accessories.png`}
              alt=""
              className={styles.blockAccessories}
            />
          </div>
          <p className={styles.title}>Accessories</p>
          <p className={styles.count}>{accsessoriesCount} models</p>
        </Link>
      </div>
    </div>
  );
};
