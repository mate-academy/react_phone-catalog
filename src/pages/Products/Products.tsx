import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './Products.scss';

import { ProductList } from '../../components/ProductList';
import { Filters } from '../../components/Filters';
import { Pagination } from '../../components/Pagination';
import { useAppContext } from '../../store/store';
import Loader from '../../components/Loader/Loader';
import { ProductNotFound } from '../../components/ProductNotFound';
import { usePreparedProducts } from '../../hooks/usePreparedProducts';

export const Products: React.FC = () => {
  const {
    state: { isLoading },
  } = useAppContext();

  const {
    preparedProducts: { total, visibleItems, itemsPerPage },
    setSearchWith,
    params: { category, currentPage },
  } = usePreparedProducts();

  return (
    <div className="products">
      <Breadcrumbs />

      <div className="products__info">
        <h1 className="products__title">{category}</h1>
        <span className="products__amount">{`${total} models`}</span>
      </div>

      <Filters />

      {isLoading && <Loader />}
      {!isLoading && <ProductList products={visibleItems} />}
      {!visibleItems.length && <ProductNotFound />}

      {!!visibleItems.length && (
        <Pagination
          total={total}
          onPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setSearchWith}
        />
      )}
    </div>
  );
};
