import React, { useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Select } from '../Select';
import { PagePagination } from '../PagePagination';
import { Product } from '../../types/Product';
import './ProductsList.scss';

type Props = {
  products: Product[]
};

const sortByParamsValues = {
  age: 'Newest', name: 'Alphabetically', price: 'Cheapest',
};

const itemsOnPageValues = {
  all: 'All', 4: 4, 8: 8, 16: 16,
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);

  const sortBy = searchParams.get('sort') || 'age';
  const currentPage = searchParams.get('page') || 1;
  const itemsOnPage = searchParams.get('itemsOnPage') || 'all';

  const pagesCount = Math.ceil(products.length / +itemsOnPage);

  const pages = useMemo(() => {
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }, [pagesCount]);

  const visibleProducts = useMemo(() => {
    const sortedProducts = products.sort((product1, product2) => {
      switch (sortBy) {
        case 'age':
          return product1.age - product2.age;
        case 'name':
          return product1.name.localeCompare(product2.name);
        default:
          return product1.price - product2.price;
      }
    });

    const indexOfStart = (+currentPage - 1) * +itemsOnPage;
    const indexOfEnd = +currentPage * +itemsOnPage;

    return itemsOnPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(indexOfStart, indexOfEnd);
  }, [products, searchParams, itemsOnPage, currentPage]);

  const changeSearchParamsByPagination = (param: string, value: number) => {
    searchParams.set(param, (value).toString());
    setSearchParams(searchParams);
  };

  const changeSearchParamsBySelect = (
    param: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    searchParams.set(param, event.target.value);
    searchParams.set('page', '1');
    searchParams.delete('page');
    searchParams.delete('perPage');
    setSearchParams(searchParams);
  };

  return (
    <div className="products">
      <div className="products__controls">
        <Select
          title="Sort by"
          value={sortBy}
          searchParam="sort"
          params={sortByParamsValues}
          onChange={changeSearchParamsBySelect}
        />

        <Select
          title="Items on page"
          value={itemsOnPage}
          searchParam="itemsOnPage"
          params={itemsOnPageValues}
          onChange={changeSearchParamsBySelect}
        />
      </div>
      <ul className="products__list">
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            className="products-list__item"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {+itemsOnPage < products.length && (
        <div className="products__footer">
          <PagePagination
            pages={pages}
            currentPage={+currentPage}
            onChangeSearchParams={changeSearchParamsByPagination}
          />
        </div>
      )}
    </div>
  );
};
