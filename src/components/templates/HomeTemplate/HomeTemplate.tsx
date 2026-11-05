import {
  HeroSlider,
  ShopByCategory,
  ProductsSlider,
} from '@/components/organisms';

import type { Data } from './HomeTemplate.types';

import styles from './HomeTemplate.module.scss';

export const HomeTemplate = ({ data }: { data: Data }) => {
  const { heroSlider, brandNewModels, shopByCategory, hotPrices } = data;

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <HeroSlider
          data={heroSlider}
          className={styles.slider}
        />
        <ProductsSlider
          data={brandNewModels}
          className={styles.brandNewModels}
        />
        <ShopByCategory
          data={shopByCategory}
          className={styles.shopByCategory}
        />
        <ProductsSlider
          data={hotPrices}
          className={styles.hotPrices}
        />
      </div>
    </main>
  );
};
