import { Banner } from './Banner';
import styles from './HomePage.module.scss';
import productsFromServer from '../../../public/api/products.json';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ByCategory } from './ByCategory';

export const HomePage = () => {
  const hotProducts = productsFromServer
    .sort((p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price))
    .slice(0, 10);

  const newProducts = productsFromServer
    .sort((p1, p2) => p2.year - p1.year)
    .slice(0, 10);

  return (
    <>
      <h1 className={styles.title}>Product Catalog</h1>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2 className={styles.sectionTitleText}>
            Welcome to Nice Gadgets store!
          </h2>
        </div>
        <Banner />
      </div>
      <ProductsSlider
        key={'new'}
        products={newProducts}
        title={'Brand new models'}
      />

      <ByCategory products={productsFromServer} />

      <ProductsSlider
        key={'hot'}
        products={hotProducts}
        title={'Hot Prices'}
        showDiscount={true}
      />
    </>
  );
};
