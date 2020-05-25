import React from 'react';
import { Product } from './Product';
import { useSearch } from './hooks/useSearch';
import { Pagination } from './Pagination';
import { Heading } from './Heading';

export const ProductsGrid = () => {
  const { searchedProducts, history, search } = useSearch();

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

  return (
    <section className="section">
      <Heading title="Mobile phones" />
      <p className="products-quantity section__products-quantity">
        95 phones
      </p>
      <div className="products">
        {currentProducts.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
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
