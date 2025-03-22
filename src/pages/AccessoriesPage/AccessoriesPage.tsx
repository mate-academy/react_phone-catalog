import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import './AccessoriesPage.scss';
import * as service from '../../api/products';
import { Product } from '../../types/Product';
import { ProductPgageList } from '../../components/ProductPgageList';
import { sortProducts, getSortBy } from '../../utils/sortProducts';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const AccessoriesPage: React.FC = () => {
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

  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  useEffect(() => {
    if (!isLoading && accessories.length === 0) {
      setErrorMessage('There are no accessories');
    } else {
      setErrorMessage('');
    }
  }, [accessories, isLoading]);

  const sortBy = getSortBy(searchParams);
  const sortedAccessories = sortProducts(accessories, sortBy);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div className="accessories-page">
          <div className="accessories-page__nav">
            <Link to={'/'} className="nav__home" />
            <div className="nav__next-step" />
            <p className="nav__title">Accessories</p>
          </div>
          <h1 className="accessories-page__title">Accessories</h1>

          <ProductPgageList products={sortedAccessories} />
        </div>
      )}
    </>
  );
};
