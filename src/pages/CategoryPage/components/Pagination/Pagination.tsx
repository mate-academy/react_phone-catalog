import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.scss';
import classNames from 'classnames';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // Функція для створення URL пагінації (залежить від SearchParams)
  generatePageUrl: (page: number) => string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  generatePageUrl,
}) => {
  if (totalPages <= 1) {
    // Приховати пагінацію, якщо тільки одна сторінка або менше
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={styles.pagination}>
      {isFirstPage ? (
        <div
          className={classNames(
            styles.pagination__button,
            styles['pagination__button--disabled'],
          )}
        >
          <img
            className={styles.pagination__button__img}
            src="src/images/icons/arrow-left-gray.svg"
            alt="arrow right"
          />
        </div>
      ) : (
        <NavLink
          to={generatePageUrl(currentPage - 1)}
          onClick={() => onPageChange(currentPage - 1)}
          className={styles.pagination__button}
          aria-disabled={isFirstPage}
        >
          <img
            className={styles.pagination__button__img}
            src="src/images/icons/arrow-left-black.svg"
            alt="arrow right"
          />
        </NavLink>
      )}

      {pages.map(page => (
        <NavLink
          key={page}
          to={generatePageUrl(page)}
          onClick={() => onPageChange(page)}
          className={classNames(styles.pagination__item, {
            [styles['pagination__item--active']]: page === currentPage,
          })}
        >
          {page}
        </NavLink>
      ))}

      {isLastPage ? (
        <div
          className={classNames(
            styles.pagination__button,
            styles['pagination__button--disabled'],
          )}
        >
          <img
            className={styles.pagination__button__img}
            src="src/images/icons/arrow-right-gray.svg"
            alt="arrow right"
          />
        </div>
      ) : (
        <NavLink
          to={generatePageUrl(currentPage + 1)}
          onClick={() => onPageChange(currentPage + 1)}
          className={styles.pagination__button}
          aria-disabled={isLastPage}
        >
          <img
            className={styles.pagination__button__img}
            src="src/images/icons/arrow-right-black.svg"
            alt="arrow right"
          />
        </NavLink>
      )}
    </div>
  );
};

export default Pagination;
