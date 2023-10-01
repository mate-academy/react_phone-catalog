import React, { FC, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import './pagination.scss';
import { Button } from '../../UI/Button';
import { getPageNumbers } from '../../../services/getPageNumbers';
import { getSearchWith } from '../../../services/getSearchWith';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumbers = useMemo(() => getPageNumbers(
    totalItems,
    itemsPerPage,
    activePage,
  ), [totalItems, itemsPerPage, activePage]);
  const lastPage = +pageNumbers[pageNumbers.length - 1].name;

  const setSearchWith = (params: { [key:string]: string | null | number }) => {
    const newParams = getSearchWith(params, searchParams);

    setSearchParams(newParams);
  };

  useEffect(() => {
    if (activePage > lastPage) {
      setSearchWith({ page: lastPage });
    }

    if (Number.isNaN(activePage) || activePage < 1) {
      setSearchWith({ page: 1 });
    }
  }, [pageNumbers, activePage]);

  const handlePageChange = (step: number) => {
    setSearchWith({ page: activePage + step });
  };

  return (
    <div className="pagination">
      <Button
        handleClick={() => handlePageChange(-1)}
        disabled={activePage === 1}
        imgName="LeftArrow"
      />

      <div className="pagination__pages">
        {pageNumbers.map(({ id, name }) => {
          const isActive = name === activePage;
          const path = getSearchWith({ page: name }, searchParams);

          return (name !== '...' && !isActive) ? (
            <Link
              key={id}
              to={`?${path}`}
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
        disabled={activePage === lastPage}
        handleClick={() => handlePageChange(1)}
        imgName="RightArrow"
      />
    </div>
  );
});
