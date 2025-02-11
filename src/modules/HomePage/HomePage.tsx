import { useMemo } from 'react';

import './HomePage.scss';

import { ProductsSlider } from '@components/ProductsSlider';

import { Categories } from './components/Categories';
import { PicturesSlider } from './components/PicturesSlider';

import { useProductsPreload } from '@hooks/useProductsPreload';

export const HomePage = () => {
  const { products } = useProductsPreload();

  const allProducts = useMemo(() => {
    return Object.values(products).flat(Infinity);
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...allProducts]
      .sort((productA, productB) => productA.age - productB.age)
      .slice(0, 20);
  }, [allProducts]);

  const hotPricesProducts = useMemo(() => {
    return [...allProducts]
      .sort((productA, productB) => {
        const discountA = productA.fullPrice - productA.price;
        const discountB = productB.fullPrice - productB.price;

        return discountB - discountA;
      })
      .slice(0, 20);
  }, [allProducts]);

  return (
    <div className="home-page">
      <h1 className="hidden">Product Catalog</h1>
      <h1>Welcome to Nice Gadgets store!</h1>

      <main className="home-page__content">
        <PicturesSlider />

        <ProductsSlider
          title={'Brand new models'}
          products={brandNewProducts}
          hidePrevPrice
        />

        <Categories />

        <ProductsSlider title={'Hot Prices'} products={hotPricesProducts} />
      </main>
    </div>
  );
};
