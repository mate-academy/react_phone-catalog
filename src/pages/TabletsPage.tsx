import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPreparedProducts, getTablets } from '../helper/fetchProducts';
import { Product } from '../types/Product';
import { ProductList } from '../components/ProductList';
import { NoResults } from '../components/NoResults';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setProductsLoading(true);
    getTablets()
      .then(fetchedProduct => setTablets(fetchedProduct))
      .catch(error => {
        throw new Error('Error fetching tablets:', error);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, []);

  const visibleTablets = getPreparedProducts(
    tablets,
    Object.fromEntries(searchParams),
  );

  return (
    <>
      {tablets.length === 0 ? (
        <NoResults category="Tablets" />
      ) : (
        <ProductList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          visibleProducts={visibleTablets}
          productsFromServer={tablets}
          productsLoading={productsLoading}
          pageName="Tablets"
        />
      )}
    </>
  );
};
