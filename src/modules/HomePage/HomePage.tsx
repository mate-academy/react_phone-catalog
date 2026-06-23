import { MainSlider } from './components/MainSlider/MainSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import styles from './HomePage.module.scss';

import products from '../../../public/api/products.json';
// eslint-disable-next-line max-len
import { HomePageCategories } from './components/HomePageCategories/HomePageCategories';

export const HomePage = () => {
  const brandNew = [...products].sort((a, b) => b.year - a.year);

  const hotPrices = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <div className={`pageGrid ${styles.page}`}>
      <h1 className={styles.visuallyHidden}>Welcome to Nice Gadgets store!</h1>

      <section className={styles.slider}>
        <MainSlider />
      </section>

      <section className={styles.section}>
        <ProductsSlider
          title="Brand new models"
          products={brandNew}
          showDiscount={false}
        />
      </section>

      <section className={styles.section}>
        <HomePageCategories products={products} />
      </section>

      <section className={styles.section}>
        <ProductsSlider
          title="Hot prices"
          products={hotPrices}
          showDiscount={true}
        />
      </section>
    </div>
  );
};
