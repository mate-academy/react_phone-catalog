import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { ProductType } from '../../types/ProductType';
import { Hero } from './components/Hero';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Category } from './components/Category';

export const HomePage = () => {
  const [newestProducts, setNewestProducts] = useState<ProductType[]>([]);
  const [hotProducts, setHotProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(readyProducts =>
        readyProducts
          .filter(product => product.year >= 2022)
          .sort(
            (product1, product2) => product2.fullPrice - product1.fullPrice,
          ),
      )
      .then(setNewestProducts)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(readyProducts =>
        readyProducts
          .filter(product => product.fullPrice > product.price)
          .sort(
            (product1, product2) => product2.fullPrice - product1.fullPrice,
          ),
      )
      .then(setHotProducts)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="sr-only">Product Catalog</h1>
      <Hero />

      <ProductsSlider
        title="Brand new models"
        products={newestProducts}
        showDiscount={false}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />

      <Category />

      <ProductsSlider
        title="Hot prices"
        products={hotProducts}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </>
  );
};
