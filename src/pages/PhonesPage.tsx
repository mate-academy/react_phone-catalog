import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './styles/Page.scss';
import { useGetProductsQuery } from '../helpers/api/productsApi';
import { Product } from '../helpers/types/Product';

import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PhonesPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [phones, setPhones] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (products) {
      setPhones(products
        .filter(product => product.type === 'phone'));
    }
  }, [products]);

  return (
    <div className="Page">
      {!query && (
        <>
          <Breadcrumbs />

          <div className="Page__top">
            <h1 className="Page__title">Mobile Phones</h1>
            <p className="Page__amount">{`${phones.length} models`}</p>
          </div>
        </>
      )}

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !phones.length ? (
        <NoResults categoryName="Mobile phones" />
      ) : (
        <ProductsList products={phones} />
      )}
    </div>
  );
};
