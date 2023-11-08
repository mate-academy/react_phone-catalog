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
  const lastPageNumber = pages.length;
  const visiblePages = useMemo(
    () => pages.slice(
      getStartPage(currentPage, lastPageNumber),
      getEndPage(currentPage, lastPageNumber),
    ),
    [currentPage, lastPageNumber],
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

      <li className="pagination__item">
        <Button
          content={ButtonType.NUMBER}
          onClick={() => setPage('1')}
          className={cn({ active: currentPage === 1 })}
        >
          1
        </Button>
      </li>

      {currentPage > 2 && <p className="pagination__space">....</p>}

      {visiblePages.map((page) => (
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

      {currentPage < lastPageNumber - 2 && (
        <>
          <p className="pagination__space">....</p>
          <li className="pagination__item">
            <Button
              content={ButtonType.NUMBER}
              onClick={() => setPage(`${lastPageNumber}`)}
              className={cn({ active: currentPage === lastPageNumber })}
            >
              {pages.length}
            </Button>
          </li>
        </>
      )}

      <li className="pagination__item">
        <Button
          content={ButtonType.ARROW}
          data-cy="paginationRight"
          onClick={moveRight}
          disabled={currentPage === lastPageNumber}
        />
      </li>
    </ul>
  );
};
