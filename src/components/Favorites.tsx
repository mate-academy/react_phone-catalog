/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';
import { Pagination } from './Pagination';
import { ProductList } from './ProductList';

export const Favorites = React.memo(() => {
  const [products] = useLocalStorage<Product[]>('favorites', []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const phones = [...products].filter(product => product.type === 'phone');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < (products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const sortedProducts = [...products].filter(product => {
    if (product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
      return true;
    }

    return false;
  });

  const to = currentPage * itemsPerPage;
  const from = to - itemsPerPage;
  const currentProducts = sortedProducts.slice(from, to);

  return (
    <>
      <div className="container grid">
        <div className="subheader grid__item--1-3">
          <Link to="/">
            <img src="img/svg/home.svg" alt="Home" />
          </Link>

          <img src="img/svg/arrow-right.svg" alt="Arrow right" />

          <p className="subheader__text">Phones</p>
        </div>

        <h1 className="subheader__title grid__item--1-7">Favorites</h1>

        <p className="subheader__quantity grid__item--1-2">{`${phones.length} models`}</p>
      </div>

      <div className="container">
        {currentProducts.length > 0
          ? <ProductList products={currentProducts} />
          : (
            <h1>
              There are no favorites yet
            </h1>
          )}
      </div>

      {currentProducts.length !== sortedProducts.length
        && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={sortedProducts.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        )}

    </>
  );
});
