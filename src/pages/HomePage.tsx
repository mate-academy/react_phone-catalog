import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

import '../styles/HomePage.scss';
import { ProductsSlider } from '../components/ProductsSlider';
import { Category } from '../components/Category';
import { PictureSlider } from '../components/PictureSlider';

export const HomePage: React.FC = () => {
  const { products } = useContext(GlobalContext);

  const homePageTitles = {
    hotPrices: 'Hot prices',
    brandNewModels: 'Brand new models',
  };

  const hotPriceProducts = products.sort((product1, product2) => (
    product1.price - product2.price
  ));

  const brandNewProducts = [...hotPriceProducts].reverse();

  return (
    <main className="HomePage">
      <h1 style={{ display: 'none' }}>Home</h1>

      <PictureSlider />

      <ProductsSlider
        products={hotPriceProducts}
        title={homePageTitles.hotPrices}
      />

      <Category />

      <ProductsSlider
        products={brandNewProducts}
        title={homePageTitles.brandNewModels}
      />

    </main>
  );
};
