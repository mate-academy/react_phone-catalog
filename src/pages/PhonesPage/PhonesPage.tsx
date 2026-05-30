import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import './PhonesPage.scss';
import * as service from '../../api/products';
import { Product } from '../../types/Product';
import { ProductPgageList } from '../../components/ProductPgageList';
import { sortProducts, getSortBy } from '../../utils/sortProducts';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';

export const PhonesPage: React.FC = () => {
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

  const phones = products.filter(product => product.category === 'phones');

  useEffect(() => {
    if (!isLoading && phones.length === 0) {
      setErrorMessage('There are no phones');
    } else {
      setErrorMessage('');
    }
  }, [phones, isLoading]);

  const sortBy = getSortBy(searchParams);
  const sortedPhones = sortProducts(phones, sortBy);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div className="phone-page">
          <div className="phone-page__nav">
            <Link to={'/'} className="nav__home" />
            <div className="nav__next-step" />
            <p className="nav__title">Phones</p>
          </div>
          <h1 className="phone-page__title">Mobile phones</h1>

          <ProductPgageList products={sortedPhones} />
        </div>
      )}
    </>
  );
};
