/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './Pagination.scss';
import { getNumbers } from '../../helpers/utils/getNumbers';
import { useScreenSize } from '../../helpers/hooks/useScreenSize';

type Props = {
  totalItems: number,
  onPage: number,
};

export const Pagination: React.FC<Props> = ({ totalItems, onPage }) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [pagesCount, setPagesCount] = useState(7);
  const screenSize = useScreenSize();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  const numberOfPages = useMemo(() => {
    return Math.ceil(totalItems / onPage) || 1;
  }, [totalItems, onPage]);

  const pageItems = useMemo(() => {
    return getNumbers(1, numberOfPages);
  }, [numberOfPages]);

  const currentPage = useMemo(() => {
    return Number(page) || 1;
  }, [page]);

  const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
  const isLastPage = useMemo(() => {
    return currentPage === numberOfPages;
  }, [currentPage, numberOfPages]);

  useEffect(() => {
    if (screenSize.width < 576) {
      setPagesCount(3);
    } else if (screenSize.width < 1024) {
      setPagesCount(5);
    } else {
      setPagesCount(7);
    }
  }, [screenSize.width]);

  useEffect(() => {
    const halfCount = Math.floor(pagesCount / 2);

    if (currentPage <= halfCount) {
      setVisiblePages(pageItems.slice(0, pagesCount));
    } else if (numberOfPages - currentPage < halfCount) {
      setVisiblePages(
        pageItems.slice(numberOfPages - pagesCount, numberOfPages),
      );
    } else {
      setVisiblePages(
        pageItems.slice(currentPage - halfCount - 1, currentPage + halfCount),
      );
    }
  }, [currentPage, pagesCount]);

  const handleToTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      searchParams.set('page', (currentPage - 1).toString());
      setSearchParams(searchParams);
    }

    handleToTopScroll();
  };

  const handlePageChange = (selectedPage: number) => {
    searchParams.set('page', selectedPage.toString());
    setSearchParams(searchParams);

    handleToTopScroll();
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      searchParams.set('page', (currentPage + 1).toString());
      setSearchParams(searchParams);
    }

    handleToTopScroll();
  };

  return (
    <ul data-cy="pagination" className="Pagination">
      <li className="Pagination__item">
        <button
          data-cy="paginationLeft"
          type="button"
          className={classNames('Pagination__arrow Pagination__arrow--prev', {
            'Pagination__arrow--disabled': isFirstPage,
          })}
          onClick={handlePreviousPage}
          disabled={isFirstPage}
        />
      </li>

      {pageItems.map(pageItem => (
        <li
          key={pageItem}
          className="Pagination__item"
          style={{
            display: visiblePages.includes(pageItem) ? 'block' : 'none',
          }}
        >
          <button
            type="button"
            className={classNames('Pagination__link', {
              'Pagination__link--active': pageItem === currentPage,
            })}
            onClick={() => handlePageChange(pageItem)}
          >
            {pageItem}
          </button>
        </li>
      ))}

      <li className="Pagination__item">
        <button
          data-cy="paginationRight"
          type="button"
          className={classNames('Pagination__arrow', {
            'Pagination__arrow--disabled': isLastPage,
          })}
          onClick={handleNextPage}
          disabled={isLastPage}
        />
      </li>
    </ul>
  );
};
