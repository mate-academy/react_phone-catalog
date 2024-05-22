import './Pagination.scss';
import React from 'react';
import { adaptivePaginationPages, scrollToTop } from '../../utils/utils';
import classNames from 'classnames';
import { SearchParamsType } from '../../helpers/searchHelper';

type Props = {
  total: number;
  onPage: number;
  currentPage: number;
  onPageChange: (params: SearchParamsType) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  onPage,
  currentPage,
  onPageChange,
}) => {
  const pages = () => {
    const result = Math.ceil(total / +onPage || 0);

    return Array.from({ length: result }, (_, index) => index + 1);
  };

  const handlePrev = () => {
    onPageChange({ page: (currentPage - 1).toString() });
    scrollToTop();
  };

  const handleNext = () => {
    onPageChange({ page: (currentPage + 1).toString() });
    scrollToTop();
  };

  const handlePageChange = (page: string) => {
    onPageChange({ page });
    scrollToTop();
  };

  return (
    pages().length > 1 && (
      <div className="pagination">
        <button
          className={classNames('pagination__button pagination__button--prev', {
            'pagination__button--prev--disabled': currentPage === pages()[0],
          })}
          disabled={currentPage === pages()[0]}
          onClick={handlePrev}
        />

        {adaptivePaginationPages(pages(), currentPage).map((page, index) =>
          page !== '...' ? (
            <button
              className={classNames('pagination__button', {
                pagination__active: currentPage === page,
              })}
              key={page}
              onClick={() => handlePageChange(page.toString())}
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
          disabled={currentPage === pages()[pages().length - 1]}
          className={classNames('pagination__button pagination__button--next', {
            'pagination__button--next--disabled':
              currentPage === pages()[pages().length - 1],
          })}
          onClick={handleNext}
        />
      </div>
    )
  );
};
