import React, { useState } from 'react';
import cn from 'classnames';
import Styles from './Pagination.module.scss';

type Props = {
  pagesTotalNumber: number;
  activePage: number;
  onPageChange: (number: number) => void;
};

export const Pagination: React.FC<Props> = ({
  activePage,
  onPageChange,
  pagesTotalNumber,
}) => {
  const pageNumber: number[] = [];

  for (let i = 0; i < pagesTotalNumber; i++) {
    pageNumber.push(i + 1);
  }

  console.log('pageNumber', pageNumber)

  const [activeButtons, setActiveButtons] = useState({
    prev: activePage > 0,
    next: activePage === pagesTotalNumber,
  });

  console.log('pagesTotalNumber', pagesTotalNumber)

  const handleDirectButton = (number: number) => {
    const newPage =
      number === -1
        ? Math.max(activePage + number, 1)
        : Math.min(activePage + number, pagesTotalNumber);

    onPageChange(newPage);

    setActiveButtons({
      prev: !newPage,
      next: newPage === pagesTotalNumber,
    });
  };

  return (
    <div className={Styles.pagination}>
      <ul className={Styles.pagination__list}>
        <li
          onClick={() => handleDirectButton(-1)}
          className={cn(
            Styles.pagination__list__item,
            Styles.pagination__list__item__button_prev,
            { [Styles.active]: activeButtons.prev },
          )}
        ></li>

        {pageNumber.map(number => (
          <li
            key={number}
            onClick={() => onPageChange(number)}
            className={cn(Styles.pagination__list__item, {
              [Styles.pagination__list__item__active]: activePage === number,
            })}
          >
            {number}
          </li>
        ))}

        <li
          onClick={() => handleDirectButton(1)}
          className={cn(
            Styles.pagination__list__item,
            Styles.pagination__list__item__button_next,
            { [Styles.active]: activeButtons.prev },
          )}
        ></li>
      </ul>
    </div>
  );
};
