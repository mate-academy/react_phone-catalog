import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product } from '../../helpers/types';
import { ProductList } from '../ProductList/ProductList';
import { Select } from '../Select/Select';

import './Catalog.scss';

type Props = {
  products: Product[];
  setProductsCounter: (n: number) => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum SORT_BY {
  age = 'Newest',
  name = 'Alphabetically',
  price = 'Cheapest',
}

export const ITEMS_PER_PAGE = [4, 8, 16, 'all'];

export const Catalog: React.FC<Props> = ({ products, setProductsCounter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = +(searchParams.get('page') || 1);
  const sortBy = searchParams.get('sort') || SORT_BY.age;
  const itemsPerPage = searchParams.get('perPage') || (ITEMS_PER_PAGE[2]);
  const query = searchParams.get('query') || '';

  const lastIndex = itemsPerPage !== 'all'
    ? +itemsPerPage * currPage
    : products.length;

  const firstIndex = itemsPerPage !== 'all'
    ? lastIndex - +itemsPerPage
    : 1;

  const setSearchWith = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value.toString());
    setSearchParams(params);
  };

  useMemo(() => {
    setSearchWith('page', 1);
  }, [itemsPerPage, sortBy]);

  function sort(filteredPhones: Product[]) {
    const newPhones = [...filteredPhones];

    switch (sortBy) {
      case (SORT_BY.age):
        newPhones.sort((a, b) => (b.year - a.year));
        break;

      case (SORT_BY.name):
        newPhones.sort((a, b) => (a.name.localeCompare(b.name)));
        break;

      case (SORT_BY.price):
        newPhones.sort((a, b) => (a.price - b.price));
        break;

      default:
        break;
    }

    return newPhones.slice(firstIndex, lastIndex);
  }

  const filteredByQuery = [...products]
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  const visibleProducts = sort(filteredByQuery);

  const getPagesButtons = () => {
    const pagesAmount = itemsPerPage !== 'all'
      ? Math.ceil(filteredByQuery.length / +itemsPerPage)
      : 1;

    let pagesButtons = [1, currPage - 1, currPage, currPage + 1, pagesAmount];

    if (currPage === 1 || currPage === 2) {
      pagesButtons = [1, 2, 3, 4, pagesAmount];
    }

    if (currPage === pagesAmount || currPage === pagesAmount - 1) {
      pagesButtons = [
        1, pagesAmount - 3, pagesAmount - 2, pagesAmount - 1, pagesAmount,
      ];
    }

    if (pagesAmount < 5) {
      pagesButtons = [];

      for (let number = 1; number <= pagesAmount; number += 1) {
        pagesButtons.push(number);
      }
    }

    return pagesButtons;
  };

  useEffect(() => {
    setProductsCounter(filteredByQuery.length);
  }, [filteredByQuery]);

  return (
    <div className="catalog">
      {filteredByQuery.length === 0
        ? <p>No products found</p>
        : (
          <>
            <div className="catalog__filters">
              <Select
                label="Sort by"
                property={sortBy}
                searchName="sort"
                setSearchWith={setSearchWith}
                propertyList={Object.values(SORT_BY)}
              />

              <Select
                label="Items on page"
                property={itemsPerPage}
                searchName="perPage"
                setSearchWith={setSearchWith}
                propertyList={ITEMS_PER_PAGE}
              />
            </div>

            <div className="catalog__product-list">
              <ProductList productsList={visibleProducts} />
            </div>

            {itemsPerPage !== 'all' && (
              <div className="catalog__pages-nav" data-cy="pagination">
                <button
                  aria-label="prev"
                  type="button"
                  className={classNames(
                    'button button--prev',
                    { 'button--disabled': currPage === 1 },
                  )}
                  data-cy="paginationLeft"
                  onClick={() => setSearchWith('page', currPage - 1)}
                />

                <div className="catalog__pages-buttons">
                  {getPagesButtons().map(n => (
                    <button
                      key={n}
                      aria-label="page"
                      type="button"
                      className={classNames('catalog__page-button',
                        { 'catalog__page-button--active': (n === currPage) })}
                      onClick={() => setSearchWith('page', n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  aria-label="next"
                  type="button"
                  className={classNames(
                    'button button--next',
                    {
                      'button--disabled':
                        currPage === getPagesButtons().length,
                    },
                  )}
                  data-cy="paginationRight"
                  onClick={() => setSearchWith('page', currPage + 1)}
                />
              </div>
            )}
          </>
        )}
    </div>
  );
};
