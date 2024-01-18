import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import './PageSlider.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  products: Product[],
  theLastPage?: number,
  pageNumbers?: number[],
  section: string,
};

export const PageSlider: React.FC<Props> = ({
  products,
  theLastPage = 2,
  pageNumbers = [],
  section,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const previousPage = () => {
    if (+page !== 1) {
      setSearchParams(
        getSearchWith(searchParams, {
          page: (+page - 1).toString(),
        }),
      );
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const nextPage = () => {
    if (+page !== theLastPage) {
      setSearchParams(
        getSearchWith(searchParams, {
          page: (+page + 1).toString(),
        }),
      );
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const paginate = (pageNumber: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: pageNumber.toString(),
      }),
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const takePageNumbers = () => {
    if (pageNumbers.length > 4) {
      if (+page <= 3) {
        return pageNumbers.slice(0, 4);
      }

      if (+page > 3 && +page < theLastPage - 1) {
        return pageNumbers.slice((+page - 3), (+page + 1));
      }

      return pageNumbers.slice((theLastPage - 4), theLastPage);
    }

    return pageNumbers;
  };

  const pageNumbersToShow = takePageNumbers();

  return (
    <div className="page-slider" data-cy="cardsContainer">

      <div className="page-slider__body">
        {products.map(product => {
          return (
            <ProductCard
              product={product}
              section={section}
              key={product.id}
            />
          );
        })}
      </div>

      {!query && (
        <div className="page-slider__pagination">
          <button
            aria-label="pagination-button"
            onClick={previousPage}
            className={classNames('page-slider__pagination-button',
              'page-slider__pagination-button--prev',
              {
                'page-slider__pagination-button--disabled': +page === 1,
              })}
            type="button"
          />

          <div className="page-slider__pagination-numbers">
            {pageNumbersToShow.map((number) => (
              <button
                aria-label="pagination-button"
                key={number}
                onClick={() => paginate(number)}
                className={classNames('page-slider__pagination-button',
                  'page-slider__pagination-button--number',
                  {
                    'page-slider__pagination-button--active':
                      +page === number,
                  })}
                type="button"
              >
                {number}
              </button>
            ))}
          </div>

          <button
            aria-label="pagination-button"
            onClick={nextPage}
            className={classNames('page-slider__pagination-button',
              'page-slider__pagination-button--next',
              {
                'page-slider__pagination-button--disabled':
                  +page === theLastPage,
              })}
            type="button"
          />
        </div>
      )}
    </div>
  );
};
