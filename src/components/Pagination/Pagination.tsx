import React, { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import { getSearchWith } from '../../utils/helpers/searchParamsHelper';
import { getEndPage } from '../../utils/helpers/getEndPage';
import { getStartPage } from '../../utils/helpers/getStartPage';
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
  const visiblePages = useMemo(
    () => pages.slice(
      getStartPage(currentPage, lastPage),
      getEndPage(currentPage, lastPage),
    ),
    [currentPage, lastPage],
  );

  const moveLeft = useCallback(() => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage - 1}` }),
    );
    window.scrollTo(0, 250);
  }, [currentPage, searchParams]);

  const moveRight = useCallback(() => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage + 1}` }),
    );
    window.scrollTo(0, 250);
  }, [searchParams, currentPage]);

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
          onClick={moveLeft}
          disabled={currentPage === 1}
        />
      </li>

      {lastPage !== 3 && (
        <li className="pagination__item">
          <Button
            content={ButtonType.NUMBER}
            onClick={() => setPage('1')}
            className={cn({ active: currentPage === 1 })}
          >
            1
          </Button>
        </li>
      )}

      {currentPage > 2 && lastPage > 4 && (
        <p className="pagination__space">....</p>)}

      {lastPage > 1 && visiblePages.map((page) => (
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

      {currentPage < lastPage - 2 && lastPage > 4 && (
        <p className="pagination__space">....</p>
      )}

      {currentPage < lastPage - 2 && (
        <li className="pagination__item">
          <Button
            content={ButtonType.NUMBER}
            onClick={() => setPage(`${lastPage}`)}
            className={cn({ active: currentPage === lastPage })}
          >
            {lastPage}
          </Button>
        </li>
      )}

      <li className="pagination__item">
        <Button
          content={ButtonType.ARROW}
          data-cy="paginationRight"
          onClick={moveRight}
          disabled={currentPage === lastPage}
        />
      </li>
    </ul>
  );
};
