import React from 'react';
import { useSearch } from '../_hooks/useSearch';

import { Heading } from '../Heading/Heading';
import { Dropdown } from '../Dropdown/Dropdown';
import { Product } from '../Product/Product';
import { Pagination } from '../Pagination/Pagination';
import { DROPDOWN_HEADINGS } from '../../helpers/storage';


const sortTypes = [
  { option: 'Newest' },
  { option: 'Hot' },
  { option: 'Lowest price' },
];

const productsPerPage = [
  { option: 'All' },
  { option: '4' },
  { option: '8' },
  { option: '16' },
];

export const ProductsList = () => {
  const {
    searchedProducts, history, search,
  } = useSearch();

  const page = Number(search.get('page')) || 1;
  const perPage = Number(search.get('perPage')) || 4;

  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentProducts = searchedProducts.slice(indexOfFirst, indexOfLast);
  const numberOfProducts = searchedProducts.length;

  const changePage = (pageNumber: number) => {
    search.set('page', pageNumber.toString());

    history.push({
      search: search.toString(),
    });
  };

  const queryCondition = () => {
    if (search.get('query')) {
      return 'result';
    }

    return 'model';
  };

  return (
    <section className="section">
      {!search.get('query') && <Heading title="Mobile phones" />}
      {numberOfProducts !== 0 && (
        <p className="products-quantity section__products-quantity">
          {numberOfProducts}
          {' '}
          {queryCondition()}
          {numberOfProducts !== 1 && 's'}
        </p>
      )}

      {!search.get('query') && (
        <div className="section__dropdowns">
          <Dropdown
            heading={DROPDOWN_HEADINGS.sortBy}
            list={sortTypes}
          />
          <Dropdown
            heading={DROPDOWN_HEADINGS.perPage}
            list={productsPerPage}
          />
        </div>
      )}

      {numberOfProducts ? (
        <div className="products">
          {currentProducts.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      )
        : (
          <p className="section__no-products-info">
            No products with such title...try again.
          </p>
        )}
      {numberOfProducts > perPage && (
        <Pagination
          total={numberOfProducts}
          perPage={perPage}
          page={page}
          changePage={changePage}
        />
      )}
    </section>
  );
};
