import { useEffect, useState } from 'react';
import { ProductPage } from '../ProductPage';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { LoadingError } from '../../components/LoadingError';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPhones = (products: Product[], type: string) => {
    const phonesFromApi = products.filter(
      product => product.type === type,
    );

    setPhones(phonesFromApi);
  };

  useEffect(() => {
    ((async () => {
      setIsLoading(true);
      try {
        const products = await getProducts();

        getPhones(products, 'phone');
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
            pageName="Phones"
            products={phones}
          />
        )}
    </>
  );
};
