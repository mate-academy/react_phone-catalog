/* eslint-disable max-len */
import './Pagination.scss';
import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const maxVisiblePages = 4;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="pagination">
      <button
        className={classNames(
          'icon',
          'icon--arrow',
          'pagination__button pagination__button-arrows',
          {
            disabled: currentPage === 1,
          },
        )}
        disabled={currentPage === 1}
        style={{
          backgroundImage: `url(img/icons/icon-arrow${currentPage !== 1 ? '-active' : ''}.svg)`,
          transform: currentPage !== 1 ? 'rotate(180deg)' : 'none',
        }}
        onClick={() => onPageChange(currentPage - 1)}
      ></button>

      {pages.map(page => (
        <button
          key={page}
          className={classNames('pagination__button', 'text', 'text__body', {
            'pagination__button-arrows--active': page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(
          'icon',
          'icon--arrow',
          'pagination__button pagination__button-arrows',
          {
            disabled: currentPage === totalPages,
          },
        )}
        disabled={currentPage === totalPages}
        style={{
          backgroundImage: `url(img/icons/icon-arrow${currentPage !== totalPages ? '-active' : ''}.svg)`,
          transform: currentPage === totalPages ? 'rotate(180deg)' : 'none',
        }}
        onClick={() => onPageChange(currentPage + 1)}
      ></button>
    </div>
  );
};
