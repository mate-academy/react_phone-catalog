import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { getTablets } from '../../helpers/getTablets';
import { Search } from '../../components/Search';
import { getProducts } from '../../helpers/fetchClient';
import { Loader } from '../../components/Loader';

export const TabletsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const loadTablets = async () => {
    setIsLoading(true);
    try {
      const productsFromServer = await getProducts();
      const tablets = getTablets(productsFromServer);

      setProducts(tablets);
    } catch {
      throw new Error('Loading Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTablets();
  }, []);

  return (
    <>
      {isLoading ? (<Loader />) : (
        <>
          {query ? (
            <Search products={products} />
          ) : (
            <ProductsList products={products} title="Tablets" />
          )}
        </>
      )}
    </>
  );
};
