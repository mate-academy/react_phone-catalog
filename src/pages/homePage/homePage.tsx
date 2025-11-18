import React from 'react';
import { categories, useHomePage } from './model';
import styles from './styles/HomePage.module.scss';
import { CategoryElement } from './ui';
import { SliderType } from '@shared/types/slider.enums';
import { Slider } from '@widgets/index';

export const HomePage = () => {
  const { amount, products, banners } = useHomePage();

  return (
    <main className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>
        <Slider model={SliderType.BANNER} props={banners} />
      </div>
      <div className={styles['home-catalogue']}>
        <Slider
          model={SliderType.CATALOGUE}
          props={{ data: products.new, title: 'Brand new Models' }}
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
              amount={amount[el.link]}
            />
          ))}
        </section>
        <Slider
          model={SliderType.CATALOGUE}
          props={{ data: products.promo, title: 'Hot prices', lazy: true }}
        />
      </div>
    </main>
  );
};
