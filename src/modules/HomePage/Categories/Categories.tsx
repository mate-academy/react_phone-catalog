import React from 'react';
import '@/styles/main.scss';
import styles from './Categories.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Categories: React.FC = () => {
  return (
    <div className={styles.categories}>
      <h2>Shop by categories</h2>
      <div className={styles.categories__container}>
        <div className={styles.categories__block}>
          <Link className={styles.categories__link} to="/phones">
            <img
              src="img/category-phones.png"
              alt="Phones"
              className={classNames(
                styles.categories__image,
                styles['categories__image--phone'],
              )}
            />
          </Link>
          <div className={styles.categories__desc}>
            <h4 className={styles['categories__desc--title']}>Mobile phones</h4>
            <p
              className={classNames(
                styles['categories__desc--qty'],
                'text--body',
              )}
            >
              65 phones
            </p>
          </div>
        </div>
        <div className={styles.categories__block}>
          <Link className={styles.categories__link} to="/tablets">
            <img
              src="img/category-tablets.png"
              alt="Phones"
              className={classNames(
                styles.categories__image,
                styles['categories__image--tablet'],
              )}
            />
          </Link>
          <div className={styles.categories__desc}>
            <h4 className={styles['categories__desc--title']}>Tablets</h4>
            <p
              className={classNames(
                styles['categories__desc--qty'],
                'text--body',
              )}
            >
              24 tablets
            </p>
          </div>
        </div>
        <div className={styles.categories__block}>
          <Link className={styles.categories__link} to="/accessories">
            <img
              src="img/category-accessories.png"
              alt="Phones"
              className={classNames(
                styles.categories__image,
                styles['categories__image--accessory'],
              )}
            />
          </Link>
          <div className={styles.categories__desc}>
            <h4 className={styles['categories__desc--title']}>Accessories</h4>
            <p
              className={classNames(
                styles['categories__desc--qty'],
                'text--body',
              )}
            >
              100 accessories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
