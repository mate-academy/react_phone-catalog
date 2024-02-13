import './Pagination.scss';
import React from 'react';
import classNames from 'classnames';

type Props = {
  currentPage: number;
  buttonsMax: number;
  buttonsList: number[];
  onPageChange: (button:number) => void;
};

export const Pagination: React.FC<Props> = ({
  buttonsList,
  currentPage,
  buttonsMax,
  onPageChange,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevButton = (prev: number) => {
    if (prev + 1 !== 1) {
      onPageChange(prev);
      scrollToTop();
    }
  };

  const getCurrrentButton = (button: number) => {
    if (button !== currentPage) {
      onPageChange(button);
      scrollToTop();
    }
  };

  const nextButton = (next: number) => {
    if (next - 1 !== buttonsMax) {
      onPageChange(next);
      scrollToTop();
    }
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        aria-label="button"
        data-cy="paginationLeft"
        disabled={currentPage === 1}
        className={classNames('pagination__btn pagination__btn-prev')}
        onClick={() => prevButton(currentPage - 1)}
      >
        <div className="icon icon-left" />
      </button>

      {buttonsList.map(button => (
        <button
          key={button}
          type="button"
          className={classNames('pagination__btn pagination__btn--page', {
            'pagination__btn-active': currentPage === button,
          })}
          onClick={() => getCurrrentButton(button)}
        >
          {button}
        </button>
      ))}

      <button
        type="button"
        aria-label="button"
        data-cy="paginationRight"
        disabled={currentPage === buttonsMax}
        className={classNames('pagination__btn pagination__btn-next')}
        onClick={() => nextButton(currentPage + 1)}
      >
        <div className="icon icon-right" />
      </button>
    </div>
  );
};
