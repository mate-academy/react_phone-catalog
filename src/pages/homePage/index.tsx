import { BaseProduct } from '@shared/types/APITypes';
import { useEffect, useState } from 'react';
import { BannerData } from '@entities/bannerSlide/types/bannerSlide';
import { Slider } from '@widgets/Slider/';
import { SliderType } from '@widgets/Slider/types/types';
import { heroStyles, prodStyles, categories } from './model';
import styles from './styles/HomePage.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { upload, uploadCatalogue } from '@server/api/mockApi';
import { Sort } from '@server/types/types';

// todo: 3 presets for slider
// separate mths from hooks
// create reducer, api
// create loader

export const HomePage = () => {
  const [products, setProducts] = useState<BaseProduct[] | null>(null);
  const [bannerList, setBannerList] = useState<BannerData[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const banners = await upload('banner');

      const params = {
        sort: Sort.FULL_PRICE_DECS_PROMO,
      };
      const prod = await uploadCatalogue(params);

      setBannerList(banners);
      setProducts(prod.dataArray);
    };

    load();
  }, []);

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
          {products && (
            <Slider
              classNames={prodStyles}
              dataset={products as BaseProduct[]}
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
          {products && (
            <Slider
              classNames={prodStyles}
              dataset={products as BaseProduct[]}
              type={SliderType.PROD}
            />
          )}
        </section>
      </div>
    </main>
  );
};
