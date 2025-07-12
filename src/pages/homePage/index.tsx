import { BaseProduct, Category } from '@shared/types/APITypes';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@shared/api/fetch';
import { BannerData } from '@entities/bannerSlide/model/bannerSlide';
import { Slider } from '@widgets/Slider/';
import { SliderType } from '@widgets/Slider/lib/types';
import {
  heroSliderConfig,
  heroStyles,
  prodSliderConfig,
  prodStyles,
} from './model';
import styles from './styles/HomePage.module.scss';

//todo: styles of header/footer btns
export const HomePage = () => {
  const [products, setProducts] = useState<BaseProduct[] | null>(null);
  const [bannerList, setBannerList] = useState<BannerData[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts(Category.Products);
      const banners = await fetchProducts(Category.Banners);

      if (data) {
        setProducts(data);
      }

      if (banners) {
        setBannerList(banners);
      }
    };

    load();
  }, []);

  return (
    <div className={styles.container}>
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
              sliderConfig={heroSliderConfig}
              type={SliderType.BANNER}
            />
          </div>
        )}
      </div>
      <main className={styles['home-catalogue']}>
        <section
          className={`${styles.prodSwiper} ${styles['slider-container']}`}
        >
          <h2 className={styles.prodSwiper__title}>Brand new Models</h2>
          {products && (
            <Slider
              classNames={prodStyles}
              dataset={products as BaseProduct[]}
              sliderConfig={prodSliderConfig}
              type={SliderType.PROD}
            />
          )}
        </section>
        <section className={styles['home-catalogue__categories']}>
          <h2 className={styles.prodSwiper__title}>Shop by category</h2>
        </section>
        <section className={styles['home-catalogue__hot-prices']}></section>
      </main>
    </div>
  );
};
