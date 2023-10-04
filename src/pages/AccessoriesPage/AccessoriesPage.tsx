import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { getAccessories } from '../../helpers/getAccessories';
import { Search } from '../../components/Search';
import { getProducts } from '../../helpers/fetchClient';
import { Loader } from '../../components/Loader';

export const AccessoriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const loadAccessories = async () => {
    setIsLoading(true);
    try {
      const productsFromServer = await getProducts();
      const accessories = getAccessories(productsFromServer);

      setProducts(accessories);
    } catch {
      throw new Error('Loading Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccessories();
  }, []);

  return (
    <>
      {isLoading ? (<Loader />) : (
        <>
          {query ? (
            <Search products={products} />
          ) : (
            <ProductsList products={products} title="Accessories" />
          )}
        </>
      )}
    </>
  );
};
