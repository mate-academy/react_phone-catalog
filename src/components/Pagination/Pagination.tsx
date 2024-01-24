import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import { getSearchWith } from '../../utils/helpers/searchParamsHelper';
import './Pagination.scss';

type Props = {
  totalItems: number;
  currentPage: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  currentPage,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = Array.from(
    { length: Math.ceil(totalItems / +perPage) },
    (_, i) => `${i + 1}`,
  );
  const lastPage = pages.length;

  const setPage = useCallback(
    (page: string) => {
      setSearchParams(getSearchWith(searchParams, { page }));
      window.scrollTo(0, 250);
    },
    [searchParams],
  );

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__item">
        <Button
          content={ButtonType.ARROW}
          direction="left"
          data-cy="paginationLeft"
          onClick={() => setPage(`${currentPage - 1}`)}
          disabled={currentPage === 1}
        />
      </li>

      {pages.map((page) => (
        <li className="pagination__item" key={page}>
          <Button
            content={ButtonType.NUMBER}
            onClick={() => setPage(page)}
            className={cn({ active: currentPage === +page })}
          >
            {page}
          </Button>
        </li>
      ))}

      <li className="pagination__item">
        <Button
          content={ButtonType.ARROW}
          data-cy="paginationRight"
          onClick={() => setPage(`${currentPage + 1}`)}
          disabled={currentPage === lastPage}
        />
      </li>
    </ul>
  );
};
