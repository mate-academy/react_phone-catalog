import classNames from 'classnames';
import './Pagination.scss';
import { URLSearchParamsInit } from 'react-router-dom';
import { getSearchWith } from '../../utils/GetSearchWith';

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

  for (let i = 1; i <= pageEnd; i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
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
        {pages.map(page => (
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
