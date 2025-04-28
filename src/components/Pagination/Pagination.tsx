import React, { useContext, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { ProductsContext, SearchOptions } from '../../contexts/ProductsContext';

type PaginationProps = {
  totalItems: number;
};

export const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const { state, dispatch } = useContext(ProductsContext);
  const { itemsPerPage, currentPage } = state;
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage],
  );

  const isDisabled = useCallback(
    (page: number) => page < 1 || page > totalPages,
    [totalPages],
  );

  const updatePageInURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);

      if (page > 1) {
        params.set(SearchOptions.Page, String(page));
      } else {
        params.delete(SearchOptions.Page);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleClickButton = useCallback(
    (direction: 'left' | 'right') => {
      const newPage = direction === 'left' ? currentPage - 1 : currentPage + 1;

      if (!isDisabled(newPage)) {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
        updatePageInURL(newPage);
        window.scrollTo(0, 0);
      }
    },
    [currentPage, dispatch, isDisabled, updatePageInURL],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (!isDisabled(page)) {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
        updatePageInURL(page);
        window.scrollTo(0, 0);
      }
    },
    [dispatch, isDisabled, updatePageInURL],
  );

  const renderPageNumbers = useMemo<JSX.Element[] | null>(() => {
    if (totalPages <= 1) {
      return null;
    }

    return [...Array(totalPages)].map((_, index) => {
      const page = index + 1;

      return (
        <button
          disabled={currentPage === page}
          key={page}
          onClick={() => handlePageChange(page)}
          className={classNames(styles.pagination__item, {
            [styles['pagination__item--active']]: currentPage === page,
          })}
        >
          {page}
        </button>
      );
    });
  }, [currentPage, handlePageChange, totalPages]);

  return (
    <div
      className={classNames(styles.pagination, {
        'not-visible': totalPages <= 1,
      })}
    >
      <button
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--disabled']]: currentPage === 1,
        })}
        disabled={isDisabled(currentPage - 1)}
        onClick={() => handleClickButton('left')}
      >
        <img
          src={
            isDisabled(currentPage - 1)
              ? './icons/chevron-arrow-left-disabled.svg'
              : './icons/chevron-arrow-left.svg'
          }
          alt="Left arrow icon"
        />
      </button>

      <div className={styles.pagination__items}>{renderPageNumbers}</div>

      <button
        className={classNames(styles.pagination__button, {
          [styles['pagination__button--disabled']]: currentPage === totalPages,
        })}
        disabled={isDisabled(currentPage + 1)}
        onClick={() => handleClickButton('right')}
      >
        <img
          src={
            isDisabled(currentPage + 1)
              ? './icons/chevron-arrow-right-disabled.svg'
              : './icons/chevron-arrow-right.svg'
          }
          alt="Right arrow icon"
        />
      </button>
    </div>
  );
};
