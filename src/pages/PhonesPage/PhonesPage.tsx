import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Search } from '../../components/Search';
import { ProductsList } from '../../components/ProductsList';
import { getPhones } from '../../helpers/getPhones';
import { getProducts } from '../../helpers/fetchClient';
import { Loader } from '../../components/Loader';

export const PhonesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const loadPhones = async () => {
    setIsLoading(true);
    try {
      const productsFromServer = await getProducts();
      const phones = getPhones(productsFromServer);

      setProducts(phones);
    } catch {
      throw new Error('Loading Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPhones();
  }, []);

  return (
    <>
      {isLoading ? (<Loader />) : (
        <>
          {query ? (
            <Search products={products} />
          ) : (
            <ProductsList products={products} title="Mobile phones" />
          )}
        </>
      )}
    </>
  );
};
