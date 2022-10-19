import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductProvider';
import { ProductsSlider } from '../../ProductsSlider';
import { ShopByCategory } from '../../ShopByCategory';
import { Banner } from '../../Banner';

export const HomePage: React.FC = () => {
  const { hotPriceProducts, brandNewProducts } = useContext(ProductsContext);

  return (
    <div className="page__homePage">
      <section className="page__section">
        <Banner />
      </section>
      <section className="page__section">
        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
        />
      </section>
      <section className="page__section">
        <ShopByCategory />
      </section>
      <section className="page__section">
        <ProductsSlider
          title="Brand new models"
          products={brandNewProducts}
        />
      </section>
    </div>
  );
};
