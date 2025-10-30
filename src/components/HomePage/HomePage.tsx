import React from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../Banner/Banner';
import styles from './HomePage.module.scss';
import { BrandNewSlider } from './BrandNewSlider/BrandNewSlider';
import { HotPricesSlider } from './HotPrices/HotPrices';

import phoneImage from '../../../public/img/category-phones.png';
import tabletsImage from '../../../public/img/category-tablets.png';
import AccessoriesImage from '../../../public/img/category-accessories.png';

export function HomePage() {
  return (
    <div className={styles.HomePage}>
      <h1 className={styles.h1}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.Banner}>
        <Banner />
      </div>
      <div className={styles.BrandNew}>
        <BrandNewSlider />
      </div>
      <h1 className={styles.h1}>Shop by category</h1>
      <div className={styles.category}>
        <div className={styles.mobilePhones}>
          <Link to="/phones">
            <div className={styles.backgroundPhones}>
              <img
                className={styles.mobilePhones__image}
                src={phoneImage}
                alt="phone"
              />
            </div>
          </Link>
          <div className={styles.mobilePhones__text}>Mobile phones</div>
          <p className={styles.p}>95 models</p>
        </div>
        <div className={styles.tablets}>
          <Link to="/tablets">
            <div className={styles.backgroundTablets}>
              <img
                className={styles.tablets__image}
                src={tabletsImage}
                alt="tablets"
              />
            </div>
          </Link>
          <div className={styles.tablets__text}>Tablets</div>
          <p className={styles.p}>24 models</p>
        </div>
        <div className={styles.accessories}>
          <Link to="/accessories">
            <div className={styles.backgroundAccessories}>
              <img
                className={styles.accessories__image}
                src={AccessoriesImage}
                alt="accessories"
              />
            </div>
          </Link>
          <div className={styles.accessories__text}>Accessories</div>
          <p className={styles.p}>100 models</p>
        </div>
      </div>
      <div className={styles.HotPrices}>
        <HotPricesSlider />
      </div>
    </div>
  );
}
