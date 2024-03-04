import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../helpers/types/Product';
import { useGetProductsQuery } from '../helpers/api/productsApi';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';

import './styles/Page.scss';

export const AccessoriesPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [accessories, setAccessories] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (products) {
      setAccessories(products
        .filter(product => product.category === 'accessories'));
    }
  }, [products]);

  return (
    <div className="Page">
      {!query && (
        <>
          <Breadcrumbs />

          <div className="Page__top">
            <h1 className="Page__title">Accessories</h1>
            <p className="Page__amount">{`${accessories.length} models`}</p>
          </div>
        </>
      )}

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !accessories.length ? (
        <NoResults categoryName="Accessories" />
      ) : (
        <ProductsList products={accessories} />
      )}
    </div>
  );
};
