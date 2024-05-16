import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { getPrepearedProducts } from '../../utils/getPrepearedProducts';
import { Product } from '../../types/Product';
import React from 'react';
import { adaptivePaginationPages, scrollOnTop } from '../../utils';
import classNames from 'classnames';

type Props = {
  products: Product[];
};

export const Pagination: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page') || 1;
  const onPageParam = searchParams.get('onPage') || 8;

  const amountOfPages = () => {
    const result = Math.ceil(
      getPrepearedProducts(products, searchParams).length / +onPageParam || 0,
    );

    return Array.from({ length: result }, (_, index) => index + 1);
  };

  const handlePrevPageChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (+pageParam - 1).toString());

    setSearchParams(params);

    scrollOnTop();
  };

  const handleNextPageChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (+pageParam + 1).toString());

    setSearchParams(params);

    scrollOnTop();
  };

  const handlePageChange = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', currentPage.toString());

    setSearchParams(params);

    scrollOnTop(200);
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
          onClick={handlePrevPageChange}
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
              <div className="pagination__darks" key={`${page}${index}`}>
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
          onClick={handleNextPageChange}
        />
      </div>
    )
  );
};
