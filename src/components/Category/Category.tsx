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
        <ul className={styles.categories__list}>
          <div className={styles.categories__item}>
            <div className={styles.categories__background}>
              <Link to="phones">
                <img
                  src={'../../../public/img/category-phones.png'}
                  alt="phones"
                  className={styles.categories__image}
                />
              </Link>
            </div>
            <div className={styles.categories__description}>
              <h2 className={styles.categories__name}>Mobile phones</h2>
              <p className={styles.categories__count}>{phonesCount} models</p>
            </div>
          </div>
          <div className={styles.categories__item}>
            <div className={styles.categories__background}>
              <Link to="tablets">
                <img
                  src={'../../../public/img/category-tablets.png'}
                  alt="tablets"
                  className={styles.categories__image}
                />
              </Link>
            </div>
            <div className={styles.categories__description}>
              <h2 className={styles.categories__name}>Tablets</h2>
              <p className={styles.categories__count}>{tabletsCount} models</p>
            </div>
          </div>
          <div className={styles.categories__item}>
            <div className={styles.categories__background}>
              <Link to="accessories">
                <img
                  src={'../../../public/img/category-accessories.png'}
                  alt="accessories"
                  className={styles.categories__image}
                />
              </Link>
            </div>
            <div className={styles.categories__description}>
              <h2 className={styles.categories__name}>Accessories</h2>
              <p className={styles.categories__count}>
                {accessoriesCount} models
              </p>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};
