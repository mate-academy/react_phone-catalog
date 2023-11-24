import { useState, useEffect } from 'react';
import { ProductsSlider } from '../components/ProductsSlider';
import { Slider } from '../components/Slider/Slider';
import { Product } from '../types/Product';
import { getProducts } from '../api/productsApi';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const sortHotPrice = [...products]
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

  // const sortNewModels = [...products]
  // .sort((a, b) => b.year - a.year);

  return (
    <div className="container">
      <Slider />
      <ProductsSlider
        products={sortHotPrice}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
