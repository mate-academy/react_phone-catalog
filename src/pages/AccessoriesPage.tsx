import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAccessories, getPreparedProducts } from '../helper/fetchProducts';
import { Product } from '../types/Product';
import { ProductList } from '../components/ProductList';
import { NoResults } from '../components/NoResults';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setProductsLoading(true);
    getAccessories()
      .then(fetchedProduct => setAccessories(fetchedProduct))
      .catch(error => {
        throw new Error('Error fetching tablets:', error);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, []);

  const visibleAccessories = getPreparedProducts(
    accessories,
    Object.fromEntries(searchParams),
  );

  return (
    <>
      {accessories.length === 0 ? (
        <NoResults category="Accessories" />
      ) : (
        <ProductList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          visibleProducts={visibleAccessories}
          productsFromServer={accessories}
          productsLoading={productsLoading}
          pageName="Accessories"
        />
      )}
    </>
  );
};
