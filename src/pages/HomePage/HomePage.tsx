import { Categories } from './components/Categories';
import { NewProducts } from './components/NewProducts';
import { HotPrices } from './components/HotPrices';
import { BannerSlider } from './components/BannerSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => (
  <section className={styles.container}>
    <h1 className={styles.title__hidden}>Product Catalog</h1>
    <h2 className={`${styles.title} text--page-title`}>
      Welcome to Nice Gadgets store!
    </h2>
    <BannerSlider />

    <NewProducts />
    <Categories />
    <HotPrices />
  </section>
);
