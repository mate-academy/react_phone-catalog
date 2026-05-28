import styles from './HomePage.module.scss';
import Banner from '../../components/Banner/Banner';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import NewModels from '../../components/NewModels/NewModels';
// eslint-disable-next-line max-len
import ShopByCategories from '../../components/ShopByCategories/ShopByCategories';
import classNames from 'classnames';

export const HomaPage = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.visually__hidden}>Product Catalog</h1>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.sections}>
        <section className={styles.banner}>
          <Banner />
        </section>

        <section
          className={classNames(styles.new__models, styles.sliderPadding)}
        >
          <NewModels />
        </section>

        <section className={styles.shop__category}>
          <ShopByCategories />
        </section>

        <section
          className={classNames(styles.hot__prices, styles.sliderPadding)}
        >
          <HotPrices />
        </section>
      </div>
    </div>
  );
};

export default HomaPage;
