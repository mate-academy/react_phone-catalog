import React, { useContext } from 'react';
import { SearchLink } from '../../utils/SearchLink';
import cn from 'classnames';
import style from './Pagination.module.scss';
import { ThemeContext } from '../../provider/ThemeContextProvider';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
};

const visiblePages = (currentPage: number, pagesCount: number) => {
  let start = currentPage - 1;
  let end = currentPage + 1;

  if (pagesCount < 4) {
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  if (start < 2) {
    start = 2;
    end = 4;
  }

  if (end > pagesCount - 1) {
    end = pagesCount - 1;
    start = end - 2;
  }

  return Array.from({ length: 3 }, (_, i) => start + i);
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const { theme } = useContext(ThemeContext);
  const safePerPage = perPage > 0 ? perPage : 1;
  const pageCount = Math.ceil(total / safePerPage);

  const visible = visiblePages(currentPage, pageCount);

  return (
    <nav className={style.pagination}>
      <ul className={style.pagination__list}>
        <li>
          <SearchLink
            params={{ pages: currentPage === 2 ? null : `${currentPage - 1}` }}
            className={cn(
              `${style.pagination__button} ${style['pagination__button--prev']}`,
              {
                [style['pagination__button--prev-disabled']]: currentPage <= 1,
                [style[`pagination__button--prev-${theme}`]]: theme,
              },
            )}
            onClick={e => {
              if (currentPage <= 1) {
                e.preventDefault();
              }
            }}
          ></SearchLink>
        </li>

        {pageCount > 4 && (
          <li>
            <SearchLink
              params={{ pages: null }}
              className={cn(style.pagination__item, {
                [style['pagination__item--active']]: currentPage === 1,
              })}
            >
              1
            </SearchLink>
          </li>
        )}
        {currentPage > 3 && (
          <li aria-hidden="true">
            <span className={style.pagination__ellipsis}>&hellip;</span>
          </li>
        )}

        {visible.map(count => (
          <li key={count}>
            <SearchLink
              params={{ pages: `${count}` }}
              className={cn(style.pagination__item, {
                [style['pagination__item--active']]: count === currentPage,
              })}
            >
              {count}
            </SearchLink>
          </li>
        ))}
        {pageCount > 6 && currentPage + 1 < pageCount && (
          <li aria-hidden="true">
            <span className={style.pagination__ellipsis}>&hellip;</span>
          </li>
        )}
        {pageCount > 4 && (
          <li>
            <SearchLink
              params={{ pages: `${pageCount}` }}
              className={cn(style.pagination__item, {
                [style['pagination__item--active']]: currentPage === pageCount,
              })}
            >
              {pageCount}
            </SearchLink>
          </li>
        )}
        <li>
          <SearchLink
            params={{ pages: `${currentPage + 1}` }}
            className={cn(
              `${style.pagination__button} ${style['pagination__button--next']}`,
              {
                [style['pagination__button--next-disabled']]:
                  currentPage >= pageCount,
                [style[`pagination__button--next-${theme}`]]: theme,
              },
            )}
            onClick={e => {
              if (currentPage >= pageCount) {
                e.preventDefault();
              }
            }}
          ></SearchLink>
        </li>
      </ul>
    </nav>
  );
};
