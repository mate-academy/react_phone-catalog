import './Pagination.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  total: number;
  perPage: number;
}

export const Pagination: React.FC<Props> = ({ total, perPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 4) {
      return allPages;
    }

    let start = currentPage - 1;

    if (start < 1) {
      start = 1;
    }

    if (start + 3 > totalPages) {
      start = totalPages - 3;
    }

    return allPages.slice(start - 1, start + 3);
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination__btn pagination__btn--prev"
        />
      </li>

      {visiblePages.map(page => (
        <li key={page} className="pagination__item">
          <button
            type="button"
            className={`pagination__btn ${
              page === currentPage ? 'is-active' : ''
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className="pagination__item">
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination__btn pagination__btn--next"
        />
      </li>
    </ul>
  );
};
