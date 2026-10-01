import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Category, Product } from '../../types/Product';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const brandNewModels = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 12);

  const hotPrices = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  const categoryCounts: Record<Category, number> = {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };

  return (
    <div className={`container ${styles.page}`}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.heading}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={brandNewModels}
        showDiscount={false}
      />

      <ShopByCategory counts={categoryCounts} />

      <ProductsSlider title="Hot prices" products={hotPrices} />
    </div>
  );
};
