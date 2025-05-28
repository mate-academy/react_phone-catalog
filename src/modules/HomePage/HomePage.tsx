import React from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProducts } from '../../hooks/useProducts';

export const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts();

  const discountedProducts = [...products]
    .filter(product => product.fullPrice && product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 8);

  const brandNewProducts = [...products]
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 8);

  if (loading) {
    return <div>Loading hot prices...</div>;
  }

  if (error) {
    return <div>Failed to load products.</div>;
  }

  return (
    <div>
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
    </div>
  );
};
