import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './styles/Page.scss';
import { useGetProductsQuery } from '../helpers/api/productsApi';
import { Product } from '../helpers/types/Product';

import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const TabletsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [tablets, setTablets] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (products) {
      setTablets(products
        .filter(product => product.type === 'tablet'));
    }
  }, [products]);

  return (
    <div className="Page">
      {!query && (
        <>
          <Breadcrumbs />

          <div className="Page__top">
            <h1 className="Page__title">Tablets</h1>
            <p className="Page__amount">{`${tablets.length} models`}</p>
          </div>
        </>
      )}

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !tablets.length ? (
        <NoResults categoryName="Tablets" />
      ) : (
        <ProductsList products={tablets} />
      )}
    </div>
  );
};
