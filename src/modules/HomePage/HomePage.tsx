import React from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProducts } from '../../hooks/useProducts';
import { useErrorHandling } from '../../hooks/errorHandling';

export const HomePage: React.FC = () => {
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));

  const brandNewProducts = [...products]
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 8);

  const discountedProducts = [...products]
    .filter(prod => prod.fullPrice && prod.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 8);

  return (
    <>
      <div>
        <h1 className={styles.title_hidden}>Product Catalog</h1>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      </div>
      {/* <div> */}
      <PicturesSlider />
      <ProductsSlider
        products={brandNewProducts}
        title="Brand new models"
        navigationPrevClass="brand-new-prev"
        navigationNextClass="brand-new-next"
        showFullPrice={false}
      />
      <ShopByCategory />
      <ProductsSlider
        products={discountedProducts}
        title="Hot prices"
        navigationPrevClass="hot-prices-prev"
        navigationNextClass="hot-prices-next"
        showFullPrice={true}
      />
      {/* </div> */}
    </>
  );
};
