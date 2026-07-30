import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import './TabletsPage.scss';
import * as service from '../../api/products';
import { Product } from '../../types/Product';
import { ProductPgageList } from '../../components/ProductPgageList';
import { sortProducts, getSortBy } from '../../utils/sortProducts';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);

    service
      .getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const tablets = products.filter(product => product.category === 'tablets');

  useEffect(() => {
    if (!isLoading && tablets.length === 0) {
      setErrorMessage('There are no tablets');
    } else {
      setErrorMessage('');
    }
  }, [tablets, isLoading]);

  const sortBy = getSortBy(searchParams);
  const sortedTablets = sortProducts(tablets, sortBy);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div className="tablets-page">
          <div className="tablets-page__nav">
            <Link to={'/'} className="nav__home" />
            <div className="nav__next-step" />
            <p className="nav__title">Tablets</p>
          </div>
          <h1 className="tablets-page__title">Tablets</h1>

          <ProductPgageList products={sortedTablets} />
        </div>
      )}
    </>
  );
};
