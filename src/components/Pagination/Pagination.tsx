/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import "./Pagination.scss";
import { Link, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import { getNumbers } from "../../helpers/Helpers";
import { getSearchWith } from "../../helpers/SearchHelper";

interface Props {
  currentPage: number;
  pageAmount: number;
}

export const Pagination: React.FC<Props> = ({ currentPage, pageAmount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages: number[] = getNumbers(1, pageAmount);

  const handleLeft = () => {
    setSearchParams(
      getSearchWith(
        {
          page: `${currentPage - 1}`,
        },
        searchParams,
      ),
    );
  };

  const handleRight = () => {
    setSearchParams(
      getSearchWith(
        {
          page: `${currentPage + 1}`,
        },
        searchParams,
      ),
    );
  };

  return (
    <div className="pagination" data-cy="pagination">
      <button
        className={classNames("pagination__btn pagination__btn--left", {
          disabled: currentPage === 1,
        })}
        data-cy="paginationLeft"
        type="button"
        onClick={handleLeft}
        disabled={currentPage === 1}
      >
        <div className="icon icon--left" />
      </button>

      <div className="pagination__pages">
        {pages.map((page) => (
          <Link
            key={page}
            to={{
              search: getSearchWith(
                {
                  page: page.toString(),
                },
                searchParams,
              ),
            }}
            className={classNames("pagination__pages--link", {
              "active-link": currentPage === page,
            })}
          >
            {page}
          </Link>
        ))}
      </div>

      <button
        className={classNames("pagination__btn pagination__btn--right", {
          disabled: currentPage === pages.length,
        })}
        data-cy="paginationRight"
        type="button"
        onClick={handleRight}
        disabled={currentPage === pages.length}
      >
        <div className="icon icon--right" />
      </button>
    </div>
  );
};
