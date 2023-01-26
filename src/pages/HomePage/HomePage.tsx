import React, { useEffect, useState } from 'react';
import { CategoryNav } from '../../components/CategoryNav/CategoryNav';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Slider } from '../../components/Slider/Slider';
import { getBrandNewModels } from '../../helpers/getBrandNewProducts';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts()
      .then(setHotPriceProducts);
    getBrandNewModels()
      .then(setBrandNewModels);
  }, []);

  return (
    <>
      <section className="page__section">
        <Slider />
      </section>
      <section className="page__section">
        <ProductsSlider
          title="Hot prices"
          products={hotPriceProducts}
        />
      </section>

      <section
        className="page__section"
      >
        <CategoryNav />
      </section>

      <section className="page__section">
        <ProductsSlider
          title="Brand new models"
          products={brandNewModels}
        />
      </section>
    </>
  );
};
