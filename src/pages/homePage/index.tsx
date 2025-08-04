import React from 'react';
import { Slider } from '@widgets/Slider/';
import { SliderType } from '@widgets/Slider/types/types';
import { heroStyles, prodStyles, categories } from './model';
import styles from './styles/HomePage.module.scss';
import { Link } from 'react-router-dom';
import { useHomePage } from './model/useHomepage';

export const HomePage = () => {
  const { newest, hotPrice, bannerList } = useHomePage();

  return (
    <main className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>

        {bannerList && (
          <div
            className={`${styles['hero-slider']} ${styles['slider-container']}`}
          >
            <Slider
              classNames={heroStyles}
              dataset={bannerList}
              type={SliderType.BANNER}
            />
          </div>
        )}
      </div>
      <div className={styles['home-catalogue']}>
        <section
          className={`${styles.prodSwiper} ${styles['slider-container']}`}
        >
          <h2 className={styles.prodSwiper__title}>Brand new Models</h2>
          {newest && (
            <Slider
              classNames={prodStyles}
              dataset={newest}
              type={SliderType.PROD}
            />
          )}
        </section>
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
                style={{ '--amount': `"${el.amount}"` } as React.CSSProperties}
              >
                {el.name}
              </h3>
            </Link>
          ))}
        </section>
        <section
          className={`${styles.prodSwiper} ${styles['slider-container']}`}
        >
          <h2 className={styles.prodSwiper__title}>Hot prices</h2>
          {hotPrice && (
            <Slider
              classNames={prodStyles}
              dataset={hotPrice}
              type={SliderType.PROD}
            />
          )}
        </section>
      </div>
    </main>
  );
};
