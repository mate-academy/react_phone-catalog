import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationRange: number[];
  generatePageLink: (pageNumber: number) => string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginationRange,
  generatePageLink,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination}>
      <Link
        to={generatePageLink(Math.max(1, currentPage - 1))}
        className={classNames(styles.arrowLink, {
          [styles['item--disabled']]: currentPage === 1,
        })}
        onClick={e => currentPage === 1 && e.preventDefault()}
      >
        <img
          src={
            currentPage === 1
              ? './icons/arrow-left.svg'
              : './icons/arrow-left-white.svg'
          }
          alt=""
          className={styles.arrowIcon}
        />
      </Link>

      {paginationRange.map(pageNumber => (
        <Link
          key={pageNumber}
          to={generatePageLink(pageNumber)}
          className={classNames(styles.pageLink, {
            [styles['pageLink--active']]: currentPage === pageNumber,
          })}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        to={generatePageLink(Math.min(totalPages, currentPage + 1))}
        className={classNames(styles.arrowLink, {
          [styles['item--disabled']]: currentPage === totalPages,
        })}
        onClick={e => currentPage === totalPages && e.preventDefault()}
      >
        <img
          src={
            currentPage === totalPages
              ? './icons/arrow-right.svg'
              : './icons/arrow-right-white.svg'
          }
          alt=""
          className={styles.arrowIcon}
        />
      </Link>
    </nav>
  );
};
