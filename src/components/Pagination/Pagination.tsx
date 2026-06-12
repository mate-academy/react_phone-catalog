// eslint-disable-next-line import/no-extraneous-dependencies
// import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
  onChange: (value: number) => void;
  currentPage: number;
  updateParams: (key: string, value: string) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onChange,
  updateParams,
}) => {
  const lastPage = currentPage === totalPages;
  let pages: (number | string)[] = [];
  const visibleButtons: number = 5;
  let startButton = currentPage;
  let endButton = currentPage + 4;

  if (totalPages <= visibleButtons) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (endButton > totalPages) {
      endButton = totalPages;
      startButton = totalPages - 4;
    }

    for (let i = startButton; i <= endButton; i++) {
      pages.push(i);
    }
  }

  const handlePgeChange = (newPage: number) => {
    if (newPage !== currentPage) {
      updateParams('page', String(newPage));
    }
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={classNames(`${styles.paginationItem} ${styles.prev}`, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={e => {
          e.preventDefault();
          if (currentPage > 1) {
            handlePgeChange(currentPage - 1);
          }
        }}
      >
        <a
          data-cy="prevLink"
          className={classNames(`${styles.paginationLink}`, {
            [styles.disabled]: currentPage === 1,
          })}
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          &lt;
        </a>
      </li>

      {pages.map(pageNumber => {
        return (
          <li
            value={currentPage}
            className={classNames(styles.paginationItem, {
              [styles.active]: currentPage === pageNumber,
            })}
            key={pageNumber}
            onClick={e => {
              e.preventDefault();
              onChange(Number(pageNumber));
            }}
          >
            <a
              data-cy="pageLink"
              className={classNames(styles.paginationLink, {
                [styles.active]: currentPage === pageNumber,
              })}
              href={`#${pageNumber}`}
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
      <li
        className={classNames(`${styles.paginationItem} ${styles.next}`, {
          [styles.disabled]: lastPage,
        })}
        onClick={e => {
          e.preventDefault();
          if (!lastPage) {
            handlePgeChange(currentPage + 1);
          }
        }}
      >
        <a
          data-cy="nextLink"
          className={classNames(`${styles.paginationLink}`, {
            [styles.disabled]: lastPage,
          })}
          href="#next"
          aria-disabled={lastPage ? 'true' : 'false'}
        >
          &gt;
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
