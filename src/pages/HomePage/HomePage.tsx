import { Banner } from '../../components/Banner';
import productsData from '../../../public/api/products.json';
import { ProductSlider } from '../../components/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const brandNew = [...productsData].sort((a, b) => b.year - a.year);

  const hotPrice = [...productsData]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <div className={styles.homePage}>
      <section className={styles.homePage__section}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>
        <p className={styles.homePage__title}>Welcome to Nice Gadgets store!</p>
        <Banner />
        <ProductSlider
          id="brand-new"
          title="Brand new models"
          products={brandNew}
        />
        <ShopByCategory products={productsData} />
        <ProductSlider id="hot-prices" title="Hot prices" products={hotPrice} />
      </section>
    </div>
  );
};
