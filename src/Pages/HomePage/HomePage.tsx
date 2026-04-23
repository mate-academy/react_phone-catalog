import { useEffect, useState } from 'react';
import { HomePageSlider } from '../../components/HomePageSlider';
import styles from './HomePage.module.scss';
import { Product } from '../../types/product';
import { getProducts } from '../../api/getProducts';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [, setRetry] = useState(0);

  const handleRetry = () => {
    setRetry(prev => prev + 1);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoader(true);
      try {
        const data = await getProducts<Product[]>();

        setProducts(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className={styles.HomePage}>
      <h1 className={styles.hidden}>Product Catalog</h1>
      {isError ? (
        <ErrorMessage onRetry={handleRetry} />
      ) : (
        <>
          <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
          <HomePageSlider />

          {isLoader ? (
            <Loader />
          ) : (
            <>
              <ProductsSlider title="Brand new models" products={products} />
              <Categories />
              <ProductsSlider title="Hot prices" products={products} />
            </>
          )}
        </>
      )}
    </div>
  );
};
