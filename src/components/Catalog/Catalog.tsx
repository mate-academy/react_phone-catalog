import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CatalogItem } from '../../types/CatalogItem';
import { ProductCard } from '../ProductCard';

import './Catalog.scss';
import { Loader } from '../Loader';

interface Props {
  pageName: string;
  products: CatalogItem[];
  loading?: boolean;
}

type SortBy = 'Newest' | 'Alphabetically' | 'Cheapest';
type itemsOnPage = 'All' | '4' | '8' | '16';

export const Catalog: React.FC<Props> = ({ pageName, products, loading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<SortBy>('Newest');
  const [itemsOnPage, setItemsOnPage] = useState<itemsOnPage>('All');
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const visibleProducts = [...products];

  const handleSetSortBy = (sortBy: string) => {
    if (sortBy === 'Alphabetically') {
      const params = new URLSearchParams(searchParams);

      params.set('sort', 'title');

      setSearchParams(params);
    }

    if (sortBy === 'Cheapest') {
      const params = new URLSearchParams(searchParams);

      params.set('sort', 'price');

      setSearchParams(params);
    }

    if (sortBy === 'Newest') {
      const params = new URLSearchParams(searchParams);

      params.delete('sort');

      setSearchParams(params);
    }
  };

  const handleSetItems = (itemsOnPage: string) => {
    if (itemsOnPage === '4') {
      const params = new URLSearchParams(searchParams);

      params.set('items', '4');

      setSearchParams(params);
    }

    if (itemsOnPage === '8') {
      const params = new URLSearchParams(searchParams);

      params.set('items', '8');

      setSearchParams(params);
    }

    if (itemsOnPage === '16') {
      const params = new URLSearchParams(searchParams);

      params.set('items', '16');

      setSearchParams(params);
    }

    if (itemsOnPage === 'All') {
      const params = new URLSearchParams(searchParams);

      params.delete('items');

      params.delete('page');

      setCurrentPage(1);

      setSearchParams(params);
    }
  };

  const handleSetCurrentPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page !== 1) {
      params.set('page', `${page}`);
    } else {
      params.delete('page');
    }

    setSearchParams(params);
    setCurrentPage(page);
  };

  const sortMethod = searchParams.get('sort');

  if (!sortMethod) {
    visibleProducts.reverse();
  }

  if (sortMethod === 'title') {
    visibleProducts.sort((p1, p2) => p1.name.localeCompare(p2.name));
  }

  if (sortMethod === 'price') {
    visibleProducts.sort((p1, p2) => p1.priceRegular - p2.priceRegular);
  }

  const itemsPerPage = itemsOnPage === 'All' ? visibleProducts.length : Number(itemsOnPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = visibleProducts.slice(startIndex, endIndex);

  const total = visibleProducts.length;
  const perPage = itemsOnPage === 'All' ? total : Number(itemsOnPage);
  const pages = perPage === total ? 1 : Math.ceil(total / perPage);

  const pageList = [];

  for (let i = 1; i <= pages; i++) {
    pageList.push(i);
  }

  const nextPage = () => {
    if (currentPage < pageList[pageList.length - 1]) {
      handleSetCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handleSetCurrentPage(currentPage - 1);
    }
  };

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    const delta = 1;
    const range: (number | string)[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) {
      range.push('...');
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push('...');
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  return (
    <>
      {loading && <Loader />}

      {products && (
        <div className="catalog">
          <div className="catalog__top">
            <h1 className="catalog__title">{pageName}</h1>
            <span className="catalog__size">{products.length} items</span>
          </div>

          <div className="catalog-page">
            {products.length > 0 && (
              <div className="catalog-page__search-params">
                <div className="catalog-page__search-params__sort-by catalog-page__search-params__element">
                  <label className="catalog-page__search-params__sort-by__lebel catalog-page__search-params__lebel">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={e => {
                      const newSort = e.target.value as SortBy;

                      setSortBy(newSort);
                      handleSetSortBy(newSort);
                    }}
                    className="catalog-page__search-params__sort-by__select catalog-page__search-params__select"
                  >
                    {['Newest', 'Alphabetically', 'Cheapest'].map(opt => (
                      <option
                        key={opt}
                        value={opt}
                        className="catalog-page__search-params__sort-by__value catalog-page__search-params__value"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="catalog-page__search-params__items-page catalog-page__search-params__element">
                  <label className="catalog-page__search-params__items-page__lebel catalog-page__search-params__lebel">
                    Items on page
                  </label>
                  <select
                    value={itemsOnPage}
                    className="catalog-page__search-params__items-page__select catalog-page__search-params__select"
                    onChange={e => {
                      const itemsOnPage = e.target.value as itemsOnPage;

                      setItemsOnPage(itemsOnPage);
                      handleSetItems(itemsOnPage);
                    }}
                  >
                    {['All', '4', '8', '16'].map(opt => (
                      <option
                        key={opt}
                        value={opt}
                        className="catalog-page__search-params__items-page__value catalog-page__search-params__value"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="catalog-page__items">
              {productsToShow.map(product => (
                <div className="catalog-page__item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {pages > 1 && itemsOnPage !== 'All' && (
            <div className="catalog__pagination">
              <div className="catalog__pagination__btn" onClick={() => prevPage()}>
                <img src="./img/left.png" alt="left" className="catalog__pagination__btn__img " />
              </div>
              {getPageNumbers(currentPage, pages).map((p, index) =>
                typeof p === 'number' ? (
                  <div
                    key={p}
                    className={`catalog__pagination__btn ${
                      p === currentPage ? 'catalog__pagination__btn--active' : ''
                    }`}
                    onClick={() => handleSetCurrentPage(p)}
                  >
                    {p}
                  </div>
                ) : (
                  <span key={`ellipsis-${index}`} className="catalog__pagination__ellipsis">
                    {p}
                  </span>
                ),
              )}
              <div className="catalog__pagination__btn" onClick={() => nextPage()}>
                <img src="./img/right.png" alt="right" className="catalog__pagination__btn__img " />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
