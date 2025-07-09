import styles from './HomePage.module.scss';
import { BaseProduct, Category } from '@shared/types/APITypes';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@shared/api/fetch';
import { BannerData } from '@entities/bannerSlide/model/bannerSlide';
import { Slider } from '@widgets/Slider/';
import { Mode } from '@widgets/Slider/model/defaultConfig';
import { SliderType } from '@widgets/Slider/lib/types';

const swiperStyles = {
  viewport: styles['hero-swiper__viewport'],
  pagination: styles['hero-swiper__pagination'],
  buttonPrev: styles['hero-swiper__button-prev'],
  buttonNext: styles['hero-swiper__button-next'],
};

const prodSwiperStyles = {
  viewport: styles.prodSwiper__viewport,
  buttonPrev: styles['prodSwiper__button-prev'],
  buttonNext: styles['prodSwiper__button-next'],
};

const heroSliderConfig = {
  mode: Mode.INFINITE,
  snap: true,
};

const prodSliderConfig = {
  mode: Mode.CLAMP,
  snap: true,
  gap: 30,
};

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
          <div className={styles['hero-swiper']}>
            <Slider
              classNames={swiperStyles}
              dataset={bannerList}
              sliderConfig={heroSliderConfig}
              type={SliderType.BANNER}
            />
          </div>
        )}
      </div>
      <main className={styles['home-catalogue']}>
        <section className={styles.prodSwiper}>
          <h2 className={styles.prodSwiper__title}>Brand new Models</h2>
          {products && (
            <Slider
              classNames={prodSwiperStyles}
              dataset={products as BaseProduct[]}
              sliderConfig={prodSliderConfig}
              type={SliderType.PROD}
            />
          )}
        </section>
        <section className={styles['home-catalogue__categories']}></section>
        <section className={styles['home-catalogue__hot-prices']}></section>
      </main>
    </div>
  );
};
