import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { Product } from '../../types/Product';
import React from 'react';
import { adaptivePaginationPages, scrollToTop } from '../../utils/utils';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../../helpers/searchHelper';

type Props = {
  products: Product[];
};

export const Pagination: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page') || 1;
  const onPage = searchParams.get('onPage') || 8;

  function setSearchWith(params: SearchParams) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  const amountOfPages = () => {
    const result = Math.ceil(products.length / +onPage || 0);

    return Array.from({ length: result }, (_, index) => index + 1);
  };

  const handlePrev = () => {
    setSearchWith({ page: (+pageParam - 1).toString() });
    scrollToTop();
  };

  const handleNext = () => {
    setSearchWith({ page: (+pageParam + 1).toString() });
    scrollToTop();
  };

  const handlePageChange = (currentPage: number) => {
    setSearchWith({ page: currentPage.toString() });
    scrollToTop();
  };

  return (
    amountOfPages().length > 1 && (
      <div className="pagination">
        <button
          className={classNames('pagination__button pagination__button--prev', {
            'pagination__button--prev--disabled':
              +pageParam === amountOfPages()[0],
          })}
          disabled={+pageParam === amountOfPages()[0]}
          onClick={handlePrev}
        />

        {adaptivePaginationPages(amountOfPages(), +pageParam).map(
          (page, index) =>
            page !== '...' ? (
              <button
                className={classNames('pagination__button', {
                  pagination__active: +pageParam === page,
                })}
                key={page}
                onClick={() => handlePageChange(+page)}
              >
                {page}
              </button>
            ) : (
              <div className="pagination__dots" key={`${page}${index}`}>
                {page}
              </div>
            ),
        )}

        <button
          disabled={+pageParam === amountOfPages()[amountOfPages().length - 1]}
          className={classNames('pagination__button pagination__button--next', {
            'pagination__button--next--disabled':
              +pageParam === amountOfPages()[amountOfPages().length - 1],
          })}
          onClick={handleNext}
        />
      </div>
    )
  );
};
