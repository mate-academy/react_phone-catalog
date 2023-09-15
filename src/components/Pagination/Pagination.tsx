import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import './pagination.scss';
import { Button } from '../UI/Button';
import { getPageNumbers } from '../../services/getPageNumbers';

type Props = {
  totalItems: number,
  itemsPerPage: number,
  activePage: number,
};

export const Pagination: FC<Props> = React.memo(({
  totalItems,
  itemsPerPage,
  activePage,
}) => {
  const pageNumbers = useMemo(() => getPageNumbers(
    totalItems,
    itemsPerPage,
    activePage,
  ), [totalItems, itemsPerPage, activePage]);

  return (
    <div className="pagination">
      <Button
        disabled={activePage === 1}
        imgName="LeftArrow"
      />

      <div className="pagination__pages">
        {pageNumbers.map(({ id, name }) => {
          const isActive = name === activePage;

          return (name !== '...' && !isActive) ? (
            <Link
              key={id}
              to={`${name}`}
              className="pagination__page"
            >
              <span
                className="pagination__page-name"
              >
                {name}
              </span>
            </Link>
          ) : (
            <span
              key={id}
              className={isActive ? (
                'pagination__page pagination__page--active'
              ) : (
                'pagination__ellipsis'
              )}
            >
              <span
                className={isActive ? (
                  'pagination__page-name pagination__page-name--active'
                ) : (
                  'pagination__ellipsis-name'
                )}
              >
                {name}
              </span>
            </span>
          );
        })}
      </div>

      <Button
        disabled={activePage === pageNumbers[pageNumbers.length - 1].name}
        imgName="RightArrow"
      />
    </div>
  );
});
