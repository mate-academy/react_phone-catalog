import React, { memo } from 'react';

import './ProductsPage.scss';
import ProductsList from '../../components/common/ProductsList';
import ErrorMessage from '../../components/common/ErrorMessage';
import Dropdown from '../../components/UI/Dropdown';
import Paginator from '../../components/UI/Paginator';
import Placeholder from '../../components/UI/Placeholder';
import { useProductsPage } from './useProductsPage';

export const ProductsPage: React.FC = memo(() => {
  const {
    amountLoading,
    amount,
    category,
    someError,
    products,
    productsLoading,
    perPageIsAll,
    sortBy,
    sortByOptions,
    changeSortBy,
    perPageOptions,
    perPage,
    pageAmount,
    changePerPage,
    page,
    setPage,
    items,
  } = useProductsPage();

  if (someError) {
    return <ErrorMessage message={someError} />;
  }

  return (
    <div className="products-page">
      <h2 className='products-page__title'>{category}</h2>

      {amountLoading && <Placeholder width='40px' height='20px' className='products-page__amount'/>}
      {!amountLoading && (
        <p className='products-page__amount'>
          <data value={amount}>
            {amount}
          </data> {items}
        </p>
      )}

      {amountLoading && <Placeholder height='40px' width='400px' className='products-page__controls'/>}
      {!amountLoading && amount > 0 && (
        <div className='products-page__controls'>
          <Dropdown
            width='176px'
            options={sortByOptions}
            selectedOption={sortBy}
            name='Sort by'
            onChange={changeSortBy}
          />

          <Dropdown
            options={perPageOptions}
            selectedOption={perPage}
            name='Items on page'
            onChange={changePerPage}
          />
        </div>
      )}

      <ProductsList
        products={products}
        placeholdersAmount={(perPageIsAll ? 16 : perPage) as number}
        loading={productsLoading}
      />

      {!perPageIsAll && pageAmount > 0 && (
        <Paginator
          className='products-page__paginator'
          itemsPerPage={perPage as number}
          itemsAmount={amount}
          currentPage={page}
          onChange={setPage}
        />
      )}
    </div>
  );
});
