import { useEffect, useState } from 'react';
import { ProductPage } from '../ProductPage';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { LoadingError } from '../../components/LoadingError';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getTablets = (products: Product[], type: string) => {
    const tabletsFromApi = products.filter(
      product => product.type === type,
    );

    setTablets(tabletsFromApi);
  };

  useEffect(() => {
    ((async () => {
      setIsLoading(true);
      try {
        const products = await getProducts();

        getTablets(products, 'tablet');
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
            pageName="Tablets"
            products={tablets}
          />
        )}
    </>
  );
};
