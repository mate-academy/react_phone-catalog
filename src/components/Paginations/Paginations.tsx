import React from 'react';
import './Paginations.scss';
import { PaginationsButton } from '../PaginationsButton/PaginationsButton';
import { PaginationsItem } from '../PaginationsItem/PaginationsItem';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void,
};

export const Paginations: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];
  const numberOfPages = Math.ceil(total / perPage);

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="paginations" data-cy="pagination">
      <ul className="paginations__list">
        <li className="paginations__item" data-cy="paginationLeft">
          <PaginationsButton
            onChange={handlePrevPage}
            text="<"
          />
        </li>

        {pages.map(item => (
          <PaginationsItem
            key={item}
            item={item}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}

        <li className="paginations__item" data-cy="paginationRight">
          <PaginationsButton
            onChange={handleNextPage}
            text=">"
          />
        </li>
      </ul>
    </div>
  );
};
