/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { ActiveButton } from '../ActiveButton';

import { PerPage } from '../../../types/Filter';
import { Button, Icon } from '../../base';

import './Pagination.scss';

export function getMaxPageNumber(
  totalItems: number,
  itemsPerPage: number,
): number {
  if (itemsPerPage === -1) {
    return 1;
  }

  return Math.ceil(totalItems / itemsPerPage);
}

export function getStartItemIndexInPage(
  page: number,
  perPage: number,
  maxPage: number,
) {
  if (perPage === -1) {
    return 0;
  }

  return Math.min(page * perPage - perPage, (maxPage - 1) * perPage);
}

export function getEndItemIndexInPage(
  page: number,
  perPage: number,
  itemsQty: number,
) {
  if (perPage === -1) {
    return itemsQty;
  }

  return Math.min(page * perPage, itemsQty);
}

function createPages(pageCurrent: number, pageLast: number) {
  const currentPage = pageCurrent;
  const pagesNums = [];

  // create numbers array

  for (let i = 1; i <= pageLast; i += 1) {
    pagesNums.push(i);
  }

  const pages = pagesNums.reduce((total, page) => {
    if (page === 1 || page === pageLast) {
      total.push(page);

      return total;
    }

    if (
      page !== currentPage &&
      page !== currentPage - 1 &&
      page !== currentPage + 1
    ) {
      return total;
    }

    total.push(page);

    return total;
  }, [] as number[]);

  if (pageLast <= 5) {
    return pagesNums;
  }

  const pagesToRender = pages.reduce((total, page) => {
    if (page - total[total.length - 1] !== 1 && page !== 1) {
      total.push(-1);
    }

    total.push(page);

    return total;
  }, [] as number[]);

  return pagesToRender;
}

type Props = {
  total: number;
  perPage: PerPage;
  page: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onChangePage,
}) => {
  const [maxPageNumber, setMaxPageNumber] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const handlePreviousButton = () => {
    onChangePage(page - 1);
  };

  const handleNextButton = () => {
    onChangePage(page + 1);
  };

  const handleChangePage = (newPage: number) => {
    if (newPage !== page) {
      onChangePage(newPage);
    }
  };

  useEffect(() => {
    if (total) {
      const maxPage = getMaxPageNumber(total, perPage);
      const numbersOfPages = createPages(page, maxPage);

      if (page > maxPage) {
        handleChangePage(maxPage);
      }

      setMaxPageNumber(maxPage);
      setPageNumbers(numbersOfPages);
    }
  }, [page, perPage, total]);

  return (
    <>
      {maxPageNumber > 1 && (
        <div className="pagination">
          <ActiveButton
            width="32px"
            height="32px"
            disabled={page === 1}
            onClickHandler={handlePreviousButton}
            block="pagination"
            className={clsx('pagination__control', 'pagination__control--left')}
            cypressParam="paginationLeft"
          >
            <Icon
              id="arrow-left"
              width={16}
              height={16}
              className="arrow__icon"
            />
          </ActiveButton>
          <ul className="pagination__list" data-cy="pagination">
            {pageNumbers.map((pageNum, index) => (
              <li
                key={`${pageNum}${index * 1}`}
                className={clsx(
                  'pagination__item',
                  'pagination__item--no-border',
                  pageNum === page && 'active',
                )}
              >
                <button
                  type="button"
                  className="pagination__link"
                  disabled={pageNum === -1}
                  onClick={() => {
                    handleChangePage(pageNum);
                  }}
                >
                  {pageNum === -1 ? '...' : pageNum}
                </button>
              </li>
            ))}
          </ul>
          <ActiveButton
            disabled={maxPageNumber === page}
            onClickHandler={handleNextButton}
            block="pagination"
            className={clsx(
              'pagination__control',
              'pagination__control--right',
            )}
            cypressParam="paginationRight"
          >
            <Icon
              id="arrow-right"
              width={16}
              height={16}
              className="arrow__icon"
            />
          </ActiveButton>
        </div>
      )}
    </>
  );
};
