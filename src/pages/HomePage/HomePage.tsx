import { ProductSlider } from '../../components/ProductSlider';
import { MobileSwiper } from '../../components/Swiper';
import { Title } from '../../components/Title';
import { ProductCategory, SortType } from '../../utils/types';
import { Slider } from '../../components/Slider';
import styles from './HomePage.module.scss';
import { ShopByCategory } from '../../components/ShopByCategory';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__title}>
        <h1
          className={`${styles.homePage__title} ${styles['homePage__title--hidden']}`}
        >
          Product Catalog
        </h1>
        <Title level={1}>Welcome to Nice Gadgets store!</Title>
      </div>
      <section className={styles.homePage__section}>
        <Slider />
        <MobileSwiper />
      </section>
      <section className={styles.homePage__section}>
        <ProductSlider
          title="Brand new models"
          category={ProductCategory.phones}
          sortBy={SortType.newest}
        />
      </section>
      <section className={styles.homePage__section}>
        <ShopByCategory />
      </section>
      <section className={styles.homePage__section}>
        <ProductSlider
          title="Hot prices"
          category={ProductCategory.phones}
          sortBy={SortType.hotPrice}
        />
      </section>
    </div>
  );
};
