import React from 'react';
import { categories, useHomePage } from './model';
import styles from './styles/HomePage.module.scss';
import { CategoryElement } from './ui';
import { Status } from '@features/index';
import { BannerData } from '@shared/types';
import { Slider } from '@widgets/slider';
import { CatalogueSlider } from '@widgets/sliders/catalogueSlider/catalogueSlider';
import { SliderDataProvider } from '@shared/lib';

export const HomePage = () => {
  const { amount, newItems, promoItems, banners } = useHomePage();

  return (
    <main className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>
        <Slider data={banners as BannerData[] | Status} />
      </div>
      <div className={styles['home-catalogue']}>
        <SliderDataProvider startIdx={0}>
          <CatalogueSlider data={newItems} title={'Brand new Models'} />
        </SliderDataProvider>

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
        <SliderDataProvider startIdx={0}>
          <CatalogueSlider data={promoItems} title={'Hot prices'} />
        </SliderDataProvider>
      </div>
    </main>
  );
};
