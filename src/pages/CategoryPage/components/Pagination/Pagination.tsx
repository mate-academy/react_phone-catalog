import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { ArrowIcon } from '../../../../components/icons/ArrowIcon';

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
  // onPageChange,
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
          <ArrowIcon direction="left" />
        </div>
      ) : (
        <NavLink
          to={generatePageUrl(currentPage - 1)}
          // onClick={() => onPageChange(currentPage - 1)}
          className={styles.pagination__button}
          aria-disabled={isFirstPage}
        >
          <ArrowIcon direction="left" />
        </NavLink>
      )}

      {pages.map(page => (
        <NavLink
          key={page}
          to={generatePageUrl(page)}
          // onClick={() => onPageChange(page)}
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
          <ArrowIcon />
        </div>
      ) : (
        <NavLink
          to={generatePageUrl(currentPage + 1)}
          // onClick={() => onPageChange(currentPage + 1)}
          className={styles.pagination__button}
          aria-disabled={isLastPage}
        >
          <ArrowIcon />
        </NavLink>
      )}
    </div>
  );
};

export default Pagination;
