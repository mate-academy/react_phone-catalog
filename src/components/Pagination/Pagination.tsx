import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Pagination.scss';

type PaginationProps = {
  lengthArrPhones: number;
};

const Pagination: React.FC<PaginationProps> = ({ lengthArrPhones }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const perPage = searchParams.get('perPage') || 'all';
  let total = 0;

  if (perPage !== 'all') {
    total = Math.ceil(lengthArrPhones / +perPage);
  }

  const arrPages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {arrPages.map(page => (
        <button
          type="button"
          className="pagination__btn"
          key={page}
          value={page}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            const target = e.target as HTMLButtonElement;

            searchParams.set('page', `${target.value}`);
            history.push({ search: searchParams.toString() });
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
