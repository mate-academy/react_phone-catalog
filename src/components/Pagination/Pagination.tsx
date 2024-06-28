import React, { useEffect, useState } from 'react';

import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowLeftGrayImg,
  ArrowRightGrayImg,
  arrowLeftImg,
  arrowRightImg,
} from '../../utils/indes';
import classNames from 'classnames';

type Props = {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<Props> = ({ total, page, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupIndex, setGroupIndex] = useState(0);
  const leftPaginationDisabled = page === 1;
  const rightPaginationDisabled = page === total;

  const itemsPerPage = 4;
  const numOfGroups = Math.ceil(total / itemsPerPage);

  const createPageArray = (totalPages: number) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }

    return pages;
  };

  const pagesArray = createPageArray(total);

  const start = groupIndex * itemsPerPage;
  const end = start + itemsPerPage;
  const currentGroup = pagesArray.slice(start, end);

  const goToPreviousGroup = () => {
    if (groupIndex > 0) {
      setGroupIndex(groupIndex - 1);
    }
  };

  const goToNextGroup = () => {
    if (groupIndex < numOfGroups - 1) {
      setGroupIndex(groupIndex + 1);
    }
  };

  const leftPaginationClick = () => {
    const newPage = page - 1;

    setPage(newPage);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);

    if (newPage % itemsPerPage === 0) {
      goToPreviousGroup();
    }
  };

  const rightPaginationClick = () => {
    const newPage = page + 1;

    setPage(newPage);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);

    if (newPage % itemsPerPage === 1) {
      goToNextGroup();
    }
  };

  const selectPage = (newPage: number) => {
    setPage(newPage);

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [searchParams, page, setPage]);

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={leftPaginationDisabled}
        onClick={leftPaginationClick}
        className={classNames('pagination__button', {
          'pagination__button-disabled': leftPaginationDisabled,
        })}
      >
        <img
          src={leftPaginationDisabled ? ArrowLeftGrayImg : arrowLeftImg}
          alt="LeftArrow"
        />
      </button>

      {currentGroup.map(item => (
        <button
          key={item}
          type="button"
          className={classNames('pagination__button pagination__item', {
            'pagination__item-active': page === item,
          })}
          onClick={() => selectPage(item)}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        disabled={rightPaginationDisabled}
        className={classNames('pagination__button pagination__item', {
          'pagination__button-disabled': rightPaginationDisabled,
        })}
        onClick={rightPaginationClick}
      >
        <img
          src={rightPaginationDisabled ? ArrowRightGrayImg : arrowRightImg}
          alt="RightArrow"
        />
      </button>
    </div>
  );
};

export default Pagination;
