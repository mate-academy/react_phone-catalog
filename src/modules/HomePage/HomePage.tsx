import { PicturesSlider, ShopByCategory } from './components';
import { ProductsSlider } from '../shared/components/ProductSlider';
import styles from './HomePage.module.scss';

import allProductsRaw from '../../../public/api/products.json';

export const HomePage = () => {
  const normalizedProducts = allProductsRaw.map(product => ({
    ...product,
    id: String(product.id),
  }));

  const brandNewProducts = [...normalizedProducts]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const hotPricesProducts = [...normalizedProducts]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10);

  return (
    <div className={styles.container}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.titleText}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={brandNewProducts}
        prevButtonId="brand-new-prev"
        nextButtonId="brand-new-next"
        isBrandNew={true}
      />

      <ShopByCategory products={normalizedProducts} />

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        prevButtonId="hot-prices-prev"
        nextButtonId="hot-prices-next"
      />
    </div>
  );
};
