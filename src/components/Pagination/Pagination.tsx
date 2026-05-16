import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPaginationItems } from '../../utils/paginationUtils';
import styles from './Pagination.module.scss';
import classNames from 'classnames';

interface Props {
  totalPage: number;
  perPage: number;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  totalPage,
  perPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(totalPage / perPage);

  if (pageCount <= 1) {
    return;
  }

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', page.toString());
    }

    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = getPaginationItems(currentPage, pageCount);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button__leftArrow}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className={styles.pagination__list}>
        {pages.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={`dots-${index}`} className={styles.pagination__dots}>
                {page}
              </span>
            );
          }

          return (
            <button
              key={page}
              className={classNames(styles.pagination__button, {
                [styles['pagination__button--active']]: page === currentPage,
              })}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={styles.pagination__button__rightArrow}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      />
    </div>
  );
};
