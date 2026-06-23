/* eslint-disable max-len */
import React, { useState } from 'react';
import styles from './shop.module.scss';
import { SkipButton } from '../../../shared/skip/skip';
import { ProductPromo } from '../../../shared/components/productlistpromo/productpromo';
import { NavLink } from 'react-router-dom';
import phones from '../../../../../public/api/phones.json';
import tablets from '../../../../../public/api/tablets.json';
import accessories from '../../../../../public/api/accessories.json';
/* eslint-enable max-len */

export const Shop: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSkip = () => setCurrentIndex(currentIndex + 1);

  const handleSkipBack = () => setCurrentIndex(currentIndex - 1);

  return (
    <section className={styles.shop}>
      <h2 className={styles.shop__title}>Shop by category</h2>
      <div className={styles.shop__category}>
        <div className={styles['shop__category-rectangle-grid1']}>
          <NavLink to={'/phones'}>
            <span className={styles.shop__rectangle}>
              <img
                className={`${styles['shop__category-phone']} ${styles['shop__category-image--scale']}`}
                src="img/category-phones.png"
                alt="mobile phones"
              />
            </span>
          </NavLink>
          <h3 className={styles['shop__category-title']}>Mobile phones</h3>
          <p className={styles.shop__counter}>{`${phones.length} models`}</p>
        </div>
        <div className={styles['shop__category-rectangle-grid2']}>
          <NavLink to={'/tablets'}>
            <span
              className={`${styles.shop__rectangle} ${styles['shop__rectangle--grey']}`}
            >
              <img
                className={`${styles['shop__category-tablets']} ${styles['shop__category-image--scale']}`}
                src="img/category-tablets.png"
                alt="mobile phones"
              />
            </span>
          </NavLink>
          <h3 className={styles['shop__category-title']}>Tablets</h3>
          <p className={styles.shop__counter}>{`${tablets.length} models`}</p>
        </div>
        <div className={styles['shop__category-rectangle-grid3']}>
          <NavLink to={'/accessories'}>
            <span
              className={`${styles.shop__rectangle} ${styles['shop__rectangle--color']}`}
            >
              <img
                className={`${styles['shop__category-accessories']} ${styles['shop__category-image--scale']}`}
                src="img/category-accessories.png"
                alt="mobile phones"
              />
            </span>
          </NavLink>
          <h3 className={styles['shop__category-title']}>Accessories</h3>
          <p
            className={styles.shop__counter}
          >{`${accessories.length} models`}</p>
        </div>
      </div>
      <div>
        <div className={styles.shop__header}>
          <h3 className={styles['shop__title-pricehot']}>Hot prices</h3>
          <div className={styles['shop__skip-button-container-grid']}>
            <SkipButton
              handleSkip={handleSkip}
              handleSkipBack={handleSkipBack}
              currentIndex={currentIndex}
            />
          </div>
        </div>
        <ProductPromo currentIndex={currentIndex} />
      </div>
    </section>
  );
};
