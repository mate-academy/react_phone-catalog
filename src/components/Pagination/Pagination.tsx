/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React from 'react';

import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  buttonsList: number[];
  onPageChange: (button: number) => void;
  currentPage: number;
  buttonsMax: number;
};

export const Pagination: React.FC<Props> = ({
  buttonsList,
  onPageChange,
  currentPage,
  buttonsMax,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const prevLinkCheck = (prevLink: number) => {
    if (prevLink + 1 !== 1) {
      onPageChange(prevLink);
      scrollToTop();
    }
  };

  const linkCheck = (button: number) => {
    if (button !== currentPage) {
      onPageChange(button);
      scrollToTop();
    }
  };

  const nextLinkCheck = (nextLink: number) => {
    if (nextLink - 1 !== buttonsMax) {
      onPageChange(nextLink);
      scrollToTop();
    }
  };

  return (
    <div className="pagination" data-cy="pagination">
      <button
        data-cy="paginationLeft"
        type="button"
        className={classNames('pagination__btn', 'pagination__btn--prew', {
          'pagination__btn--disabled': currentPage === 1,
        })}
        onClick={() => prevLinkCheck(currentPage - 1)}
      >
        <img
          src={require('../../images/icons/slider-arrow-left.svg').default}
          alt="Prev"
        />
      </button>

      {buttonsList.map(button => (
        <button
          key={button}
          type="button"
          className={classNames('pagination__btn', 'pagination__btn--page', {
            'pagination__btn--active': currentPage === button,
          })}
          onClick={() => linkCheck(button)}
        >
          {button}
        </button>
      ))}

      <button
        data-cy="paginationRight"
        type="button"
        className={classNames('pagination__btn', 'pagination__btn--next', {
          'pagination__btn--disabled': currentPage === buttonsMax,
        })}
        onClick={() => nextLinkCheck(currentPage + 1)}
      >
        <img
          src={require('../../images/icons/slider-arrow-right.svg').default}
          alt="Next"
        />
      </button>
    </div>
  );
};
