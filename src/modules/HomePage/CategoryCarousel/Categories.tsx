import React from 'react';
import '@/styles/main.scss';
import styles from './Categories.module.scss';
import classNames from 'classnames';

export const Categories: React.FC = () => {
  return (
    <div className={styles.categories}>
      <h2>Shop by categories</h2>
      <div className={styles.categories__container}>
        <div className={styles.categories__block}>
          <img
            src="/img/category-phones.png"
            alt="Phones"
            className={classNames(
              styles.categories__image,
              styles['categories__image--phone'],
            )}
          />
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
          <img
            src="/img/category-tablets.png"
            alt="Phones"
            className={classNames(
              styles.categories__image,
              styles['categories__image--tablet'],
            )}
          />
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
          <img
            src="/img/category-accessories.png"
            alt="Phones"
            className={classNames(
              styles.categories__image,
              styles['categories__image--accessory'],
            )}
          />
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
