/* eslint-disable max-len */

import './ProductsPage.scss';
import productFromServer from '../../../public/api/products.json';
import { ProductList } from '../Product/ProductList/ProductList';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type SortParams = 'newest' | 'oldest' | 'cheapers' | 'expensive';

export const ProductsPage = ({ category }: { category: string }) => {
  const products = productFromServer.filter(
    product => product.category === category,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPagin, setCurrentPagin] = useState(1);

  const sortValue = searchParams.get('sort');

  const sortParams: SortParams | null =
    sortValue === 'newest' ||
    sortValue === 'oldest' ||
    sortValue === 'cheapers' ||
    sortValue === 'expensive'
      ? sortValue
      : null;

  const perPageValue = searchParams.get('perPage');

  const elementsOnPage =
    perPageValue === 'all'
      ? products.length
      : [4, 8, 16, products.length].includes(Number(perPageValue))
        ? Number(perPageValue)
        : 16;

  const sort = (sortType: string | null) => {
    const sortedPhones = [...products];

    switch (sortType) {
      case 'newest':
        return sortedPhones.sort((phone1, phone2) => phone2.year - phone1.year);

      case 'oldest':
        return sortedPhones.sort((phone1, phone2) => phone1.year - phone2.year);

      case 'cheapers':
        return sortedPhones.sort(
          (phone1, phone2) => phone1.fullPrice - phone2.fullPrice,
        );

      case 'expensive':
        return sortedPhones.sort(
          (phone1, phone2) => phone2.fullPrice - phone1.fullPrice,
        );

      default:
        return sortedPhones;
    }
  };

  const changePage = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', String(page));
      }

      return params;
    });
  };

  const sortedPhones = sort(sortParams);

  const totalPages = Math.ceil(sortedPhones.length / elementsOnPage);

  const startIndex = (currentPagin - 1) * elementsOnPage;
  const endIndex = startIndex + elementsOnPage;

  const visiblePhones = sortedPhones.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPagin(1);
  }, [category]);

  return (
    <main className="products-main">
      <div className="products-location">
        <div className="products-location__path">
          <Link to={'/'}>
            <img
              className="products-location__icon"
              src="icons/Home.png"
              alt=""
            />
          </Link>
          <svg
            className="button__next-img"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill={'#4A4D58'}
            />
          </svg>
          <p className="products-location__text">{category}</p>
        </div>
      </div>
      <h1 className="products-main__title">
        Mobile phones
        <p className="products-models__count">{`${products.length} models`}</p>
      </h1>

      <section className="products-params">
        <div className="products-params__sort-by">
          <div className="products-params__title">Sort by</div>
          <div className="products-sort-by__select-wrapper">
            <select
              className="products-sort-by__select"
              name="sort-by"
              id=""
              value={sortParams ?? 'none'}
              onChange={event => {
                const value = event.target.value;

                setSearchParams(prev => {
                  const params = new URLSearchParams(prev);

                  if (value === 'none') {
                    params.delete('sort');
                  } else {
                    params.set('sort', value);
                  }

                  return params;
                });

                setCurrentPagin(1);
              }}
            >
              <option value="none" disabled>
                Choose Sort
              </option>
              <option value={'newest'}>Newest</option>
              <option value={'oldest'}>Oldest</option>
              <option value={'cheapers'}>Cheapest first</option>
              <option value={'expensive'}>Most expensive first</option>
            </select>
            <svg
              className="products__arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M9.13799 0.195263C9.39834 0.455612 9.39834 0.877722 9.13799 1.13807L5.13799 5.13807C4.87764 5.39842 4.45553 5.39842 4.19518 5.13807L0.195181 1.13807C-0.0651694 0.877722 -0.0651694 0.455612 0.195181 0.195262C0.45553 -0.0650873 0.87764 -0.0650873 1.13799 0.195262L4.66658 3.72386L8.19518 0.195263C8.45553 -0.065087 8.87764 -0.0650869 9.13799 0.195263Z"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="#75767F"
              />
            </svg>
          </div>
        </div>

        <div className="products-params__item-on-page">
          <div className="products-params__title">Item on page</div>
          <div className="products-item-on-page__select-wrapper">
            <select
              className="products-item-on-page__select"
              name="products-item-on-page"
              id=""
              value={elementsOnPage}
              onChange={event => {
                const value = event.target.value;

                setSearchParams(prev => {
                  const params = new URLSearchParams(prev);

                  if (value === '16') {
                    params.delete('perPage');
                  } else {
                    params.set('perPage', value);
                  }

                  return params;
                });

                setCurrentPagin(1);
              }}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value={String(products.length)}>all</option>
            </select>
            <svg
              className="products__arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M9.13799 0.195263C9.39834 0.455612 9.39834 0.877722 9.13799 1.13807L5.13799 5.13807C4.87764 5.39842 4.45553 5.39842 4.19518 5.13807L0.195181 1.13807C-0.0651694 0.877722 -0.0651694 0.455612 0.195181 0.195262C0.45553 -0.0650873 0.87764 -0.0650873 1.13799 0.195262L4.66658 3.72386L8.19518 0.195263C8.45553 -0.065087 8.87764 -0.0650869 9.13799 0.195263Z"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="#75767F"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="products-products">
        <div className="products-products__content">
          <ProductList
            products={
              visiblePhones as Parameters<typeof ProductList>[0]['products']
            }
            column={true}
          />
        </div>
      </section>

      <section className="products-pagination">
        {perPageValue !== 'all' && (
          <>
            <button
              className={`products-pagination__button products-pagination__button__prev ${currentPagin === 1 ? 'products-pagination__button--disabled' : ''}`}
              onClick={() => {
                setCurrentPagin(current => current - 1);
                changePage(currentPagin - 1);
              }}
              disabled={currentPagin === 1}
            >
              <svg
                className="products-pagination__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M5.13823 0.195262C4.87788 -0.0650874 4.45577 -0.0650874 4.19542 0.195262L0.195425 4.19526C-0.0649247 4.45561 -0.0649247 4.87772 0.195425 5.13807L4.19542 9.13807C4.45577 9.39842 4.87788 9.39842 5.13823 9.13807C5.39858 8.87772 5.39858 8.45561 5.13823 8.19526L1.60964 4.66667L5.13823 1.13807C5.39858 0.877722 5.39858 0.455612 5.13823 0.195262Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={currentPagin === 1 ? '#4A4D58' : '#F1F2F9'}
                />
              </svg>
            </button>
            <div className="products-pagination__pages">
              {Array.from({
                length: Math.min(4, totalPages),
              }).map((_, index) => {
                const startPage = Math.max(
                  1,
                  Math.min(currentPagin, totalPages - 3),
                );

                const page = startPage + index;

                if (page > totalPages) {
                  return null;
                }

                return (
                  <button
                    key={page}
                    className={`products-pagination__page ${currentPagin === page ? 'products-pagination__current' : ''}`}
                    onClick={() => {
                      setCurrentPagin(page);
                      changePage(page);
                    }}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              className={`products-pagination__button products-pagination__button__next ${currentPagin === totalPages ? 'products-pagination__button--disabled' : ''}`}
              onClick={() => {
                setCurrentPagin(current => current + 1);
                changePage(currentPagin + 1);
              }}
              disabled={currentPagin === totalPages}
            >
              <svg
                className="products-pagination__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={currentPagin === totalPages ? '#4A4D58' : '#F1F2F9'}
                />
              </svg>
            </button>
          </>
        )}
      </section>
    </main>
  );
};
