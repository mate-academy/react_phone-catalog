import React from 'react';
import { categories } from './model';
import styles from './styles/HomePage.module.scss';
import { Link } from 'react-router-dom';
import { useHomePage } from './model/useHomepage';
import { Slider } from '@widgets/slider';

export const HomePage = () => {
  const { amount, items } = useHomePage();

  return (
    <main className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>
        <Slider mode="hero" data={items.banner} />
      </div>
      <div className={styles['home-catalogue']}>
        <Slider mode="catalogue" data={items.new} title="Brand new Models" />
        <section
          className={styles.categories}
          style={{ '--fields-count': categories.length } as React.CSSProperties}
        >
          <h2 className={styles.categories__title}>Shop by category</h2>
          {categories.map(el => (
            <Link to={`/${el.link}`} key={el.id}>
              <img
                className={styles.categories__image}
                src={`/src/shared/img/${el.src}`}
              />
              <h3
                className={styles.categories__name}
                style={
                  {
                    '--amount': `"${amount[el.link]}"`,
                  } as React.CSSProperties
                }
              >
                {el.name}
              </h3>
            </Link>
          ))}
        </section>
        <Slider mode="catalogue" data={items.promo} title="Hot prices" />
      </div>
    </main>
  );
};
