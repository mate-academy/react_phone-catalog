import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';

import './Pagination.scss';

import {
  ReactComponent as IconArrowLeft,
} from '../../images/icons/arrow-left.svg';
import {
  ReactComponent as IconArrowRight,
} from '../../images/icons/arrow_right.svg';

import { scrollTop } from '../../helpers/consts';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => searchParams.get('page'), [searchParams]);

  useEffect(() => {
    if (page === null) {
      setSearchParams(
        getSearchWith(searchParams, { page: currentPage.toString() }),
      );
    }
  }, []);

  const pagesCount = useMemo(
    () => Math.ceil(total / perPage),
    [total, perPage],
  );

  const pageNumberArray = useMemo(() => {
    const result = [];

    for (let i = 1; i <= pagesCount; i += 1) {
      result.push(i.toString());
    }

    return result;
  }, [pagesCount]);

  const onPageChange = useCallback((pageNumber: string) => {
    setSearchParams(getSearchWith(searchParams, { page: pageNumber }));
  }, [getSearchWith, searchParams]);

  const leftArrowHandle = () => {
    if (page !== null && +page > 1) {
      setSearchParams(getSearchWith(searchParams, { page: `${+page - 1}` }));

      scrollTop();
    }
  };

  const rightArrowHandle = () => {
    if (page !== null && +page < pagesCount) {
      setSearchParams(getSearchWith(searchParams, { page: `${+page + 1}` }));

      scrollTop();
    }
  };

  const rightButtonDisabled = page !== null && +page === pagesCount;
  const leftButtonDisabled = page !== null && +page === 1;

  return (
    <ul className="paggination" data-cy="pagination">
      <button
        className={classNames(
          'paggination__element paggination__element-arrow',
          'paggination__element-arrow--left',
          { 'paggination__element-arrow--disabled': leftButtonDisabled },
        )}
        data-cy="paginationLeft"
        onClick={leftArrowHandle}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            leftArrowHandle();
          }
        }}
        tabIndex={0}
        type="button"
      >
        <IconArrowLeft
          className={classNames('paggination__arrow', {
            'paggination__arrow--disabled': leftButtonDisabled,
          })}
        />
      </button>

      {pageNumberArray.map((pageNumber) => (
        <button
          key={pageNumber}
          className={classNames(
            'paggination__element paggination__element--number',
            { 'paggination__element--active': pageNumber === page },
          )}
          onClick={() => onPageChange(pageNumber.toString())}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              onPageChange(pageNumber.toString());
            }
          }}
          tabIndex={0}
          type="button"
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={classNames(
          'paggination__element paggination__element-arrow',
          'paggination__element-arrow--right',
          { 'paggination__element-arrow--disabled': rightButtonDisabled },
        )}
        onClick={rightArrowHandle}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            rightArrowHandle();
          }
        }}
        data-cy="paginationRight"
        tabIndex={0}
        type="button"
      >
        <IconArrowRight
          className={classNames('paggination__arrow', {
            'paggination__arrow--disabled': rightButtonDisabled,
          })}
        />
      </button>
    </ul>
  );
};
