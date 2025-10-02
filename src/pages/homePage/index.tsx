import React from 'react';
import { categories, useHomePage } from './model';
import styles from './styles/HomePage.module.scss';
import { Slider } from '@widgets/slider';
import { CategoryElement } from './ui';
import { BannerData } from '@server/types';
import { CatalogueData } from '@shared/api/types';
import { InfiniteSlider } from '@widgets/infiniteSlider';
import { Status } from '@features/index';

export const HomePage = () => {
  const { amount, newItems, promoItems, banners } = useHomePage();

  return (
    <main className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>
        <InfiniteSlider data={banners as BannerData[] | Status} />
      </div>
      <div className={styles['home-catalogue']}>
        <Slider
          mode="catalogue"
          data={newItems as CatalogueData}
          title="Brand new Models"
        />
        <section
          className={styles.categories}
          style={{ '--fields-count': categories.length } as React.CSSProperties}
        >
          <h2 className={styles.categories__title}>Shop by category</h2>
          {categories.map(el => (
            <CategoryElement
              key={el.id}
              category={el}
              amount={amount[el.link].items}
            />
          ))}
        </section>
        <Slider
          mode="catalogue"
          data={promoItems as CatalogueData}
          title="Hot prices"
        />
      </div>
    </main>
  );
};
