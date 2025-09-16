import React from 'react';
import { categories, useHomePage } from './model';
import styles from './styles/HomePage.module.scss';
import { Slider } from '@widgets/slider';
import { CategoryElement } from './ui';

export const HomePage = () => {
  const { amount, newItems, promoItems, banners } = useHomePage();

  return (
    <main className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>
        <Slider mode="hero" data={banners} title="" />
      </div>
      <div className={styles['home-catalogue']}>
        <Slider
          mode="catalogue"
          data={typeof newItems === 'string' ? newItems : newItems.items}
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
              amount={amount[el.link].items as string}
            />
          ))}
        </section>
        <Slider
          mode="catalogue"
          data={typeof promoItems === 'string' ? promoItems : promoItems.items}
          title="Hot prices"
        />
      </div>
    </main>
  );
};
