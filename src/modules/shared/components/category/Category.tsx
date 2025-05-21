import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import React from 'react';

interface Props {
  products: {
    category: string;
  }[];
}

export const Category: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <>
      <div className={styles.categories}>
        <div className={styles.categories__group}>
          <div className={styles.categories__item}>
            <div className={styles.categories__background}>
              <Link to="phones">
                <img
                  src={'./img/category-phones-new.png'}
                  alt="phones"
                  className={styles.categories__image}
                />
              </Link>
            </div>
            <div className={styles.categories__description}>
              <h3 className={styles.categories__name}>Mobile phones</h3>
              <p className={styles.categories__count}>{phonesCount} models</p>
            </div>
          </div>
          <div className={styles.categories__item}>
            <div className={styles.categories__background}>
              <Link to="tablets">
                <img
                  src={'./img/category-tablets.png'}
                  alt="tablets"
                  className={styles.categories__image}
                />
              </Link>
            </div>
            <div className={styles.categories__description}>
              <h3 className={styles.categories__name}>Tablets</h3>
              <p className={styles.categories__count}>{tabletsCount} models</p>
            </div>
          </div>
          <div className={styles.categories__item}>
            <div className={styles.categories__background}>
              <Link to="accessories">
                <img
                  src={'./img/category-accessories.png'}
                  alt="accessories"
                  className={styles.categories__image}
                />
              </Link>
            </div>
            <div className={styles.categories__description}>
              <h3 className={styles.categories__name}>Accessories</h3>
              <p className={styles.categories__count}>
                {accessoriesCount} models
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
