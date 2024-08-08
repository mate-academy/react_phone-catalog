/* eslint-disable no-plusplus */
import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../services/utils/scrollToTop';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({ total, perPage, currentPage, onPageChange }) => {
    const numberPageLinks = Math.ceil(total / perPage);

    const pageLinks = [];

    for (let i = 1; i <= numberPageLinks; i++) {
      pageLinks.push(i);
    }

    if (pageLinks.length > 6) {
      if (currentPage < 3) {
        pageLinks.splice(5);
      } else if (currentPage > numberPageLinks - 3) {
        pageLinks.splice(0, numberPageLinks - 5);
      } else {
        pageLinks.splice(0, currentPage - 3);
        pageLinks.splice(5);
      }
    }

    const nextPageArrow = () => {
      if (currentPage < numberPageLinks) {
        onPageChange(currentPage + 1);
      }
    };

    const prevPageArrow = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handlePageChange = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      page: number,
    ) => {
      e.preventDefault();
      onPageChange(page);
      scrollToTop();
    };

    const prevArrowDisabled = currentPage === 1;
    const nextArrowDisabled = currentPage === numberPageLinks;

    return (
      <ul className="pagination">
        <li
          className={cn('pagination__item pagination__item--back', {
            disabled: prevArrowDisabled,
          })}
        >
          <Link
            className="pagination__link"
            to="#prev"
            aria-disabled={prevArrowDisabled}
            onClick={e => {
              e.preventDefault();
              prevPageArrow();
            }}
          >
            {}
          </Link>
        </li>
        {pageLinks[0] !== 1 && <span className="pagination__item">...</span>}
        {pageLinks.map((page: number) => (
          <li
            key={page}
            className={cn('pagination__item', { active: page === currentPage })}
          >
            <Link
              className="pagination__link"
              to={`#${page}`}
              onClick={e => handlePageChange(e, page)}
            >
              {page}
            </Link>
          </li>
        ))}
        {pageLinks[pageLinks.length - 1] !== numberPageLinks && (
          <span className="pagination__item">...</span>
        )}
        <li
          className={cn('pagination__item pagination__item--next', {
            disabled: nextArrowDisabled,
          })}
        >
          <Link
            className="pagination__link"
            to="#next"
            aria-disabled={nextArrowDisabled}
            onClick={e => {
              e.preventDefault();
              nextPageArrow();
            }}
          >
            {}
          </Link>
        </li>
      </ul>
    );
  },
);
