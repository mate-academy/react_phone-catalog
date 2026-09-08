import WelcomeText from '../../components/WelcomeText/WelcomeText';
import styles from './HomePage.module.scss';
import Banner from '../../components/Banner/Banner';
import BrandNewModels from '../../components/BrandNewModels/BrandNewModels';
import ShopByCategory from '../../components/ShopByCategory/ShopByCategory';
import HotPrices from '../../components/HotPrices/HotPrices';

const HomePage = () => {
  return (
    <>
      <WelcomeText />
      <section className={styles.banner}>
        <Banner />
      </section>

      <section className={styles.brandNewModels}>
        <BrandNewModels />
      </section>

      <section className={styles.shopByCategory}>
        <ShopByCategory />
      </section>

      <section className={styles.hotPrices}>
        <HotPrices />
      </section>
    </>
  );
};

export default HomePage;
