import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { SearchParams } from '../../types/SearchParams';

enum Direction {
  NEXT = 'next',
  BACK = 'back',
}

type Props = {
  pagesNumber: number;
  scrollToTop: () => void;
};

const SMALL_PAGINATION_LENGTH = 4;
const BIG_PAGINATION_LENGTH = 9;

export const Pagination: React.FC<Props> = ({ pagesNumber, scrollToTop }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get(SearchParams.PAGE_NUMBER) ?? 1);
  const query = searchParams.get(SearchParams.QUERY) ?? '';
  const newParams = new URLSearchParams(searchParams);
  const pages = new Array(pagesNumber)
    .fill(1)
    .map((element, index) => index + element);
  const lastPage = pages[pages.length - 1];

  let centerPages: number[] = pages.slice(1, lastPage - 1);
  let mobilePages: number[] = [...pages];

  const smallPaginationOverflowed = pages.length > SMALL_PAGINATION_LENGTH;
  const bigPaginationOverflowed = pages.length > BIG_PAGINATION_LENGTH;

  useEffect(() => {
    if (currentPage < 0 || currentPage > lastPage) {
      newParams.delete(SearchParams.PAGE_NUMBER);
      setSearchParams(newParams);
    }
  }, [currentPage]);

  const handlePageChange = (page: Direction | number, scroll = true) => {
    switch (page) {
      case Direction.BACK:
        if (currentPage - 1 > 1) {
          newParams.set(SearchParams.PAGE_NUMBER, `${currentPage - 1}`);
        } else {
          newParams.delete(SearchParams.PAGE_NUMBER);
        }

        break;

      case Direction.NEXT:
        newParams.set(
          SearchParams.PAGE_NUMBER,
          `${currentPage + 1 <= lastPage ? currentPage + 1 : lastPage}`,
        );
        break;

      default:
        if (page <= 1 || page > lastPage) {
          newParams.delete(SearchParams.PAGE_NUMBER);
        } else {
          newParams.set(SearchParams.PAGE_NUMBER, `${page}`);
        }

        break;
    }

    setSearchParams(newParams);

    if (scroll) {
      scrollToTop();
    }
  };

  useEffect(() => {
    handlePageChange(1, false);
  }, [query]);

  const prepareCenterPages = () => {
    if (currentPage <= 4) {
      centerPages = pages.slice(2, 7);

      return;
    }

    if (currentPage >= lastPage - 4) {
      centerPages = pages.slice(lastPage - 7, lastPage - 2);

      return;
    }

    centerPages = pages.slice(currentPage - 2, currentPage + 3);
  };

  const prepareMobilePages = () => {
    if (currentPage <= 2) {
      mobilePages = pages.slice(0, 4);

      return;
    }

    if (currentPage >= lastPage - 2) {
      mobilePages = pages.slice(lastPage - 4);

      return;
    }

    mobilePages = pages.slice(currentPage - 2, currentPage + 2);
  };

  if (smallPaginationOverflowed) {
    prepareMobilePages();
  }

  if (bigPaginationOverflowed) {
    prepareCenterPages();
  }

  return (
    <nav className="pagination">
      <button
        className={classNames(
          'pagination__button',
          'pagination__button--type--back',
          { disabled: currentPage === 1 },
        )}
        onClick={() => handlePageChange(Direction.BACK)}
        tabIndex={currentPage === 1 ? -1 : 0}
      ></button>

      <ol className="pagination__list pagination__list--size--l">
        <li className="pagination__list-item">
          <button
            className={classNames(
              'pagination__button',
              'pagination__button--border--light',
              { active: currentPage === 1 },
            )}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>

        {bigPaginationOverflowed &&
          (currentPage <= 4 ? (
            <li className="pagination__list-item">
              <button
                className={classNames(
                  'pagination__button',
                  'pagination__button--border--light',
                  { active: currentPage === 2 },
                )}
                onClick={() => handlePageChange(2)}
              >
                2
              </button>
            </li>
          ) : (
            <li className="pagination__list-item">
              <button
                className="
              pagination__button
              pagination__button--border--light
            "
                onClick={() => handlePageChange(centerPages[0] - 1)}
              >
                ...
              </button>
            </li>
          ))}

        {centerPages.map(pageNumber => (
          <li className="pagination__list-item" key={pageNumber}>
            <button
              className={classNames(
                'pagination__button',
                'pagination__button--border--light',
                { active: currentPage === pageNumber },
              )}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {bigPaginationOverflowed &&
          (currentPage >= lastPage - 5 ? (
            <li className="pagination__list-item">
              <button
                className={classNames(
                  'pagination__button',
                  'pagination__button--border--light',
                  { active: currentPage === lastPage - 1 },
                )}
                onClick={() => handlePageChange(lastPage - 1)}
              >
                {lastPage - 1}
              </button>
            </li>
          ) : (
            <li className="pagination__list-item">
              <button
                className="
              pagination__button
              pagination__button--border--light
            "
                onClick={() =>
                  handlePageChange(centerPages[centerPages.length - 1] + 1)
                }
              >
                ...
              </button>
            </li>
          ))}

        <li className="pagination__list-item">
          <button
            className={classNames(
              'pagination__button',
              'pagination__button--border--light',
              { active: currentPage === lastPage },
            )}
            onClick={() => handlePageChange(lastPage)}
          >
            {lastPage}
          </button>
        </li>
      </ol>

      <ol className="pagination__list pagination__list--size--s">
        {mobilePages.map(pageNumber => (
          <li className="pagination__list-item" key={pageNumber}>
            <button
              className={classNames(
                'pagination__button',
                'pagination__button--border--light',
                { active: currentPage === pageNumber },
              )}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ol>

      <button
        className={classNames(
          'pagination__button',
          'pagination__button--type--next',
          { disabled: currentPage === lastPage },
        )}
        onClick={() => handlePageChange(Direction.NEXT)}
        tabIndex={currentPage === lastPage ? -1 : 0}
      ></button>
    </nav>
  );
};
