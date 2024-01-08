import { useState, useEffect } from 'react';

import './HomePage.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel/Carousel';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { getProducts } from '../../api/products';

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
    .sort(
      (productA, productB) => productA.fullPrice
        - productA.price
        - (productB.fullPrice - productB.price),
    )
    .reverse();

  const sortedByAge = [...products]
    .sort((productA, productB) => productA.year - productB.year)
    .reverse();

  return (
    <div className="HomePage">
      <h1 className="HomePage__title">Welcome to Nice Gadgets store!</h1>

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
