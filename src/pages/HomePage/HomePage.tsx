import { useState, useEffect } from 'react';

import './HomePage.scss';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getProducts } from '../../api';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortedByDiscount = [...products]
    .sort((productA, productB) => (productA.fullPrice - productA.price)
    - (productB.fullPrice - productB.price))
    .reverse();

  const sortedByAge = [...products]
    .sort((productA, productB) => productA.year - productB.year)
    .reverse();

  return (
    <div className="HomePage">
      <Carousel />

      <ProductSlider
        products={sortedByDiscount}
        title="Hot prices"
        isLoading={isLoading}
        isLoadError={isLoadError}
      />

      <ShopByCategory products={products} />

      <ProductSlider
        products={sortedByAge}
        title="Brand new models"
        isLoading={isLoading}
        isLoadError={isLoadError}
      />
    </div>
  );
};
