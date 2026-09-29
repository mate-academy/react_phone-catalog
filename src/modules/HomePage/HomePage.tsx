import { useMemo } from 'react';
import { useProducts } from '@/shared/context/ProductsContext';

import { getProductsWithHotPrices, sortByYear } from '@/utils';

import { Hero } from './components/Hero';
import { ProductsSlider } from '@/shared/components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';

import './HomePage.scss';

export const HomePage = () => {
  const { products, loadData, hasError } = useProducts();

  const visibleNewModels = useMemo(() => sortByYear(products), [products]);

  const visibleHotPrices = useMemo(
    () => getProductsWithHotPrices(products),
    [products],
  );

  const categoriesCount = {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };

  return (
    <div className="home-page">
      <h1 className="visually-hidden">Product Catalog</h1>
      <Hero hasError={hasError} />

      <ProductsSlider
        title="Brand New Models"
        products={visibleNewModels}
        onRetry={loadData}
      />

      <ShopByCategory categoriesCount={categoriesCount} hasError={hasError} />

      <ProductsSlider
        title="Hot prices"
        className="home-page__section"
        products={visibleHotPrices}
        onRetry={loadData}
      />
    </div>
  );
};
