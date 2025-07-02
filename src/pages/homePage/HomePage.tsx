import { bannerList } from '../../components/temp/bannerList';
import styles from './HomePage.module.scss';
import { MSwiper } from '../../components/MSwiper';
import { ProductCard } from '../../entities/prodCard/index';

const swiperStyles = {
  main: styles['hero-swiper'],
  viewport: styles['hero-swiper__viewport'],
  pagination: styles['hero-swiper__pagination'],
  buttonPrev: styles['hero-swiper__button-prev'],
  buttonNext: styles['hero-swiper__button-next'],
};

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles['visually-hidden']}>Product Catalog</h1>
      <div className={styles.welcome}>
        <span className={styles.welcome__text}>
          Welcome to Nice Gadgets store!
        </span>

        <MSwiper
          classNames={swiperStyles}
          dataset={bannerList}
          clamp
          buttons
          swipeCoeff={1.2}
          animationSpeed={300}
          snap
          infinite
        />
      </div>
      <main className={styles['home-catalogue']}>
        <section className={styles['home-catalogue__brand-new']}>
          <h2>Brand new Models</h2>
          <ProductCard />
        </section>
        <section className={styles['home-catalogue__categories']}></section>
        <section className={styles['home-catalogue__hot-prices']}></section>
      </main>
    </div>
  );
};
