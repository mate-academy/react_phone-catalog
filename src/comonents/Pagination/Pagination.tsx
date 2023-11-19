import classNames from 'classnames';

import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getSearchWith } from '../../helpers/utils/getSearchWith';

import './Pagination.scss';

type Props = {
  currentPage: number,
  pageCount: number[],
  totalLength: number,
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  pageCount,
  totalLength,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [
    isPrevDisabled,
    isNextDisabled,
    isPrev,
    isNext,
  ] = useMemo(() => {
    const isPrevDisabledValue = currentPage === 1;
    const isNextDisabledValue = currentPage === pageCount.length;
    const isNextValue = currentPage < totalLength
      ? currentPage + 1 : currentPage;
    const isPrevValue = currentPage > 1 ? currentPage - 1 : currentPage;

    return [isPrevDisabledValue, isNextDisabledValue, isPrevValue, isNextValue];
  }, [currentPage, pageCount.length, totalLength]);

  useEffect(() => {
    if (isPrevDisabled) {
      setSearchParams(getSearchWith(searchParams, { page: null }));
    }
  }, [isPrevDisabled]);

  return (
    <ul className="pagination" data-cy="pagination">
      <li className={classNames(
        'pagination__item',
        { 'pagination__item--disabled': isPrevDisabled },
      )}
      >
        <Link
          to={{
            search: getSearchWith(
              searchParams, { page: isPrev.toString() },
            ),
          }}
          className="pagination__link"
          data-cy="paginationLeft"
        >
          <span className={classNames(
            'icon',
            'icon--prev',
            {
              'icon--arrow': !isPrevDisabled,
              'icon--arrow-dis': isPrevDisabled,
            },
          )}
          />
        </Link>
      </li>

      {pageCount.map(page => (
        <li
          key={page}
          className="pagination__item"
        >
          <Link
            to={{
              search: getSearchWith(
                searchParams, { page: page.toString() },
              ),
            }}
            className={classNames(
              'pagination__link',
              { 'pagination__link--active': page === currentPage },
            )}
          >
            {page}
          </Link>
        </li>
      ))}

      <li className={classNames(
        'pagination__item',
        { 'pagination__item--disabled': isNextDisabled },
      )}
      >
        <Link
          to={{
            search: getSearchWith(searchParams, { page: isNext.toString() }),
          }}
          className="pagination__link"
          data-cy="paginationRight"
        >
          <span className={classNames(
            'icon',
            'icon--next',
            {
              'icon--arrow': !isNextDisabled,
              'icon--arrow-dis': isNextDisabled,
            },
          )}
          />
        </Link>
      </li>
    </ul>
  );
};
