import React, { useState } from 'react';
import styles from './HomePage.module.scss';
import { Slider } from './components/Slider';
import { NewModels } from './components/NewModels';
import { Product } from '../../shared/types/Product';
import productsFromServer from 'api/products.json';
import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';

export const HomePage: React.FC = () => {
  const [products] = useState<Product[]>(productsFromServer);

  return (
    <div className={styles.HomePage}>
      <div className={styles.HomePage__content}>
        <div className={styles.HomePage__titleWrapper}>
          <h1 className={styles.HomePage__title}>
            <span className={styles.HomePage__line1}>Welcome to Nice </span>
            <span className={styles.HomePage__line2}>Gadgets store!</span>
          </h1>
        </div>

        <Slider className={styles.HomePage__slider} />
        <NewModels products={products} className={styles.HomePage__newModels} />
        <Categories
          products={products}
          className={styles.HomePage__categories}
        />
        <HotPrices products={products} className={styles.HomePage__hotPrices} />
      </div>
    </div>
  );
};
