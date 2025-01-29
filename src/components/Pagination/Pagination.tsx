import styles from './Pagination.module.scss';
import React from 'react';

export const Pagination: React.FC<{
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ total, perPage = 16, currentPage = 1, onPageChange }) => {
  const pages = [...Array(Math.ceil(total / perPage)).keys()].map(i => i + 1);

  return (
    <>
      <ul className={styles.pagination}>
        <li
          className={`${styles['page-item']} ${currentPage === 1 ? styles.disabled : ''}`}
        >
          <a
            data-cy="prevLink"
            className={styles['page-link']}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`${styles['page-item']} ${page === currentPage ? styles.active : ''}`}
          >
            <a
              data-cy="pageLink"
              className={styles['page-link']}
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`${styles['page-item']} ${currentPage === pages.length ? styles.disabled : ''}`}
        >
          <a
            data-cy="nextLink"
            className={styles['page-link']}
            onClick={e => {
              e.preventDefault();
              if (currentPage < pages.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
