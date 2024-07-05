import classNames from 'classnames';
import './Pagination.scss';
import { URLSearchParamsInit } from 'react-router-dom';
import { getSearchWith } from '../../utils/GetSearchWith';
import { useState } from 'react';

type Props = {
  pageEnd: number;
  currentPage: number;
  params: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
};

export const Pagination: React.FC<Props> = ({
  pageEnd,
  currentPage,
  params,
  setSearchParams,
}) => {
  const pages = [];
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  for (let i = 1; i <= pageEnd; i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }

    if (currentPage >= Math.ceil(end / 2) && start > 0) {
      setStart(currentStart => currentStart - 1);
      setEnd(currentEnd => currentEnd - 1);
    }

    setSearchParams(
      getSearchWith(params, {
        page: `${currentPage - 1}`,
      }),
    );
  };

  const handleNextPage = () => {
    if (currentPage === pageEnd) {
      return;
    }

    if (currentPage >= Math.round(end / 2) && end < pageEnd) {
      setStart(currentStart => currentStart + 1);
      setEnd(currentEnd => currentEnd + 1);
    }

    setSearchParams(
      getSearchWith(params, {
        page: `${currentPage + 1}`,
      }),
    );
  };

  return (
    <div className="pagination">
      <button
        className="pagination__prev button__prev"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      ></button>
      <div className="pagination__buttons">
        {pages.slice(start, end).map(page => (
          <button
            className={classNames('pagination__button', {
              'pagination__button--active': currentPage === page,
            })}
            key={page}
            onClick={() => {
              setSearchParams(
                getSearchWith(params, {
                  page: `${page}`,
                }),
              );
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="pagination__next button__next"
        onClick={handleNextPage}
        disabled={currentPage === pageEnd}
      ></button>
    </div>
  );
};
