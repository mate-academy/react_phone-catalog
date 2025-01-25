import { useContext, useMemo } from 'react';

import './HomePage.scss';

import { ProductsSlider } from '@components/ProductsSlider';

import { ProductsContext } from '@store/ProductsStore';
import { Categories } from './components/Categories';

export const HomePage = () => {
  const products = useContext(ProductsContext);

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((productA, productB) => productA.age - productB.age)
      .slice(0, 20);
  }, [products]);

  const hotPricesProducts = useMemo(() => {
    return [...products]
      .sort((productA, productB) => {
        const discountA = productA.fullPrice - productA.price;
        const discountB = productB.fullPrice - productB.price;

        return discountB - discountA;
      })
      .slice(0, 20);
  }, [products]);

  return (
    <div className="home-page">
      <h1>Welcome to Nice Gadgets store!</h1>

      <ProductsSlider
        title={'Brand new models'}
        products={brandNewProducts}
        hidePrevPrice
      />

      <Categories />

      <ProductsSlider title={'Hot Prices'} products={hotPricesProducts} />
    </div>
  );
};
