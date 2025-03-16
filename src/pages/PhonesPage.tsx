import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPhones, getPreparedProducts } from '../helper/fetchProducts';
import { Product } from '../types/Product';
import { ProductList } from '../components/ProductList';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setProductsLoading(true);
    getPhones()
      .then(fetchedProduct => setPhones(fetchedProduct))
      .catch(error => {
        throw new Error('Error fetching phones:', error);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, []);

  const visiblePhones = getPreparedProducts(
    phones,
    Object.fromEntries(searchParams),
  );

  return (
    <ProductList
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      visibleProducts={visiblePhones}
      productsFromServer={phones}
      productsLoading={productsLoading}
      pageName="Mobile phones"
    />
  );
};
