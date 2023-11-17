import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './Pagination.scss';
import { Button } from '../Button/Button';
import { SearchParamsType } from '../../types/SearchParamsTypes';

type Props = {
  totalItems: number;
  perPage: number;
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(
    searchParams.get(SearchParamsType.activePage),
  ) || 1;

  const pageCount = useMemo(
    () => getNumbers(1, (Math.ceil(totalItems / perPage) || 1)),
    [totalItems, perPage],
  );

  const setParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(name, value);
    setSearchParams(params);
  };

  const prevPageHandler = () => (
    currentPage !== 1
    && setParam(SearchParamsType.activePage, String(currentPage - 1))
  );

  const nextPageHandler = () => (
    currentPage !== pageCount.length
    && setParam(SearchParamsType.activePage, String(currentPage + 1))
  );

  const setPageHandler = (page: number) => (
    setParam(SearchParamsType.activePage, String(page))
  );

  return (
    <ul className="Pagination">
      <li className="Pagination__arrow">
        <Button
          variant="arrow"
          arrowDirection="left"
          disabled={currentPage === 1}
          onClick={prevPageHandler}
        />
      </li>

      {pageCount.map(page => (
        <li
          key={page}
          className="Pagination__item"
        >
          <Button
            variant="number"
            className={cn({ active: currentPage === page })}
            onClick={() => setPageHandler(page)}
          >
            {page}
          </Button>
        </li>
      ))}

      <li className="Pagination__arrow">
        <Button
          variant="arrow"
          disabled={currentPage === pageCount.length}
          onClick={nextPageHandler}
        />
      </li>
    </ul>
  );
};
