import { ProductSlider } from '../../components/ProductSlider';
import { MobileSwiper } from '../../components/Swiper';
import { Title } from '../../components/Title';
import { ProductCategory, SortType } from '../../utils/types';
import { Slider } from './components/Slider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__title}>
        <Title level={1}>Welcome to Nice Gadgets store!</Title>
      </div>
      <section>
        <Slider />
        <MobileSwiper />
      </section>
      <section>
        <ProductSlider
          title="Brand new models"
          category={ProductCategory.phones}
          sortBy={SortType.newest}
        />
      </section>
      <section>
        <ProductSlider
          title="Hot prices"
          category={ProductCategory.phones}
          sortBy={SortType.hotPrice}
        />
      </section>
    </div>
  );
};
