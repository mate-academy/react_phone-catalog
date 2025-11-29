import { useEffect, useState, useMemo } from 'react';
import { HeroSection } from './HeroSection/HeroSection';
import { Product } from '../../types/products';
import { getProducts } from '../../api';
import { ItemsSlider } from '../../components/ItemsSlider';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Categories } from './Categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loaderCards = [0, 0, 0, 0];

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(fetchedProducts => {
        setProducts(fetchedProducts);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const newProducts = useMemo(() => {
    return [...products].sort((prod1, prod2) => -prod1.year - prod2.year);
  }, [products]);

  const hotPriceProducts = useMemo(() => {
    return [...products].sort(
      (prod1, prod2) => -prod1.fullPrice - prod2.fullPrice,
    );
  }, [products]);

  return (
    <main>
      {error ? (
        <ErrorMessage errorMessage={error} />
      ) : (
        <>
          <HeroSection />
          <ItemsSlider
            models={newProducts}
            kindOfModel="products"
            title="Brand new models"
            isLoading={isLoading}
            loaderCards={loaderCards}
          />
          <Categories />
          <ItemsSlider
            models={hotPriceProducts}
            kindOfModel="products"
            title="Hot Prices"
            hotPrice={true}
            isLoading={isLoading}
            loaderCards={loaderCards}
          />
        </>
      )}
    </main>
  );
};
