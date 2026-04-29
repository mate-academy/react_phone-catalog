import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handleClick = (
    page: number,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ''}`}
      >
        <a
          data-cy="prevLink"
          className={styles.pageLink}
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => handleClick(currentPage - 1, e)}
        >
          «
        </a>
      </li>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <li
            key={page}
            className={`${styles.pageItem} ${currentPage === page ? styles.active : ''}`}
          >
            <a
              data-cy="pageLink"
              className={styles.pageLink}
              href={`#${page}`}
              onClick={e => handleClick(page, e)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ''}`}
      >
        <a
          data-cy="nextLink"
          className={styles.pageLink}
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={event => handleClick(currentPage + 1, event)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
