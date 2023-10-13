import React from 'react';
import cn from 'classnames';
import '../Paginations/Paginations.scss';

type Props = {
  item: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

export const PaginationsItem: React.FC<Props> = ({
  item,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <li className="paginations__item">
      <button
        type="button"
        className={cn('paginations__button', {
          'paginations__button--active': item === currentPage,
        })}
        onClick={() => setCurrentPage(item)}
      >
        {item}
      </button>
    </li>
  );
};
