import React from 'react';
import { categories, useHomePage } from './model';
import styles from './styles/HomePage.module.scss';
import { CategoryElement } from './ui';
import { BannerData } from '@server/types';
import { InfiniteSlider } from '@widgets/slider';
import { Status } from '@features/index';
import { CatalogueData } from '@shared/api/types';

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
        {typeof newItems !== 'string' && (
          <InfiniteSlider
            data={{
              array: (newItems as CatalogueData).items,
              title: 'Brand new Models',
            }}
          />
        )}
        <section
          className={styles.categories}
          style={{ '--fields-count': categories.length } as React.CSSProperties}
        >
          <h2 className={styles.categories__title}>Shop by category</h2>
          {categories.map(el => (
            <CategoryElement
              key={el.id}
              category={el}
              amount={amount[el.link].items as number | Status}
            />
          ))}
        </section>
        {typeof promoItems !== 'string' && (
          <InfiniteSlider
            data={{
              array: (promoItems as CatalogueData).items,
              title: 'Hot prices',
            }}
          />
        )}
      </div>
    </main>
  );
};
