import { useEffect, useState } from 'react';
import { ProductPage } from '../ProductPage';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { LoadingError } from '../../components/LoadingError';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAccessories = (products: Product[], type: string) => {
    const accessoriesFromApi = products.filter(
      product => product.type === type,
    );

    setAccessories(accessoriesFromApi);
  };

  useEffect(() => {
    ((async () => {
      setIsLoading(true);
      try {
        const products = await getProducts();

        getAccessories(products, 'accessory');
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }))();
  }, []);

  return (
    <>
      {error && <LoadingError />}

      {!error && isLoading && document.readyState === 'complete'
        ? <Loader />
        : (
          <ProductPage
            pageName="Accessories"
            products={accessories}
          />
        )}
    </>
  );
};
