import React, { useEffect, useState } from 'react';
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { ItemsOnPage } from '../../Types/SortMethod';
import { SearchLink } from '../SearchLink';
import { scrollToTop } from '../../helpers/scrollToTop';
import classNames from 'classnames';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('itemsOnPage')) || +ItemsOnPage.eight;

  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [pages, setPages] = useState<number[]>([]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages[pages.length - 1];

  const getNumbers = (from: number, to: number) => {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  useEffect(() => {
    setPages(getNumbers(1, Math.ceil(total / perPage)));
  }, [total, perPage]);

  useEffect(() => {
    if (pages.length < 5) {
      setVisiblePages(pages);

      return;
    }

    if (isLastPage) {
      setVisiblePages(pages.slice(pages.length - 4));

      return;
    }

    if (pages.slice(0, 3).includes(currentPage)) {
      setVisiblePages(pages.slice(0, 4));
    } else {
      setVisiblePages(pages.slice(currentPage - 3, currentPage + 1));
    }
  }, [perPage, currentPage, pages, isLastPage]);

  return (
    <div className="pagination">
      <SearchLink
        params={{ page: `${currentPage - 1}` }}
        onClick={scrollToTop}
        className={classNames('pagination__button pagination__button-arrow', {
          'pagination__button--disabled': isFirstPage,
        })}
      >
        <i
          className={classNames('icon icon--arrow-left', {
            'icon--arrow-left--disabled': isFirstPage,
          })}
        ></i>
      </SearchLink>

      <ul className="pagination__list">
        {visiblePages.map(page => (
          <li key={page}>
            <SearchLink
              params={{ page: `${page}` }}
              onClick={scrollToTop}
              className={classNames(
                'pagination__button pagination__button-number',
                {
                  'pagination__button-number--selected': page === currentPage,
                },
              )}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ul>

      <SearchLink
        params={{ page: `${currentPage + 1}` }}
        onClick={scrollToTop}
        className={classNames('pagination__button pagination__button-arrow', {
          'pagination__button--disabled': isLastPage,
        })}
      >
        <i
          className={classNames('icon icon--arrow-right', {
            'icon--arrow-right--disabled': isLastPage,
          })}
        ></i>
      </SearchLink>
    </div>
  );
};
