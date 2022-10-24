import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  total: number;
  perPage: number | string;
  page: number;
  onPageChange: (number: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, page, onPrevPage, onNextPage, onPageChange,
}) => {
  const { pathname, search } = useLocation();

  const pages: number = useMemo(() => {
    return (perPage === 'all') ? 0 : Math.ceil(total / +perPage);
  }, [perPage, total]);

  const visiblePageNumbers = useMemo(() => {
    const pageNumbers: number[] = Array.from(Array(pages)).map((_, i) => i + 1);

    return pageNumbers;
  }, [pages]);

  return (
    <div className="pagination" data-cy="pagination">
      <ul className="pagination__list">
        <li className="pagination__item" data-cy="paginationLeft">
          <Link
            to={`${pathname}${search}`}
            className={classNames(
              'pagination__link pagination__link--prev',
              { 'pagination__link-disabled-prev': page === 1 },
            )}
            onClick={onPrevPage}
          />
        </li>
        {visiblePageNumbers.map(number => (
          <li className="pagination__item" key={Math.random()}>
            <Link
              to={`${pathname}${search}`}
              className={classNames(
                'pagination__link',
                {
                  'pagination__link--active': page === number,
                },
              )}
              onClick={() => onPageChange(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <li className="pagination__item" data-cy="paginationRight">
          <Link
            to={`${pathname}${search}`}
            className={classNames(
              'pagination__link pagination__link--next',
              { 'pagination__link-disabled-next': page === pages },
            )}
            onClick={onNextPage}
          />
        </li>
      </ul>
    </div>
  );
};
