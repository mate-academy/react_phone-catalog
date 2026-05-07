import { Link, useSearchParams } from 'react-router-dom';
import { SliderButton } from '../SliderButton';
import s from './Pagination.module.scss';
import { getSearchWith } from '../../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination = ({ total, perPage, currentPage }: Props) => {
  const [searchParams] = useSearchParams();

  const totalPages = Math.ceil(total / perPage);

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const visibleNumbers = new Set<number>();

    visibleNumbers.add(1);
    visibleNumbers.add(totalPages);

    visibleNumbers.add(currentPage);

    if (currentPage - 1 > 1) {
      visibleNumbers.add(currentPage - 1);
    }

    if (currentPage + 1 < totalPages) {
      visibleNumbers.add(currentPage + 1);
    }

    const sortedPages = [...visibleNumbers].sort((a, b) => a - b);

    for (let i = 0; i < sortedPages.length; i++) {
      const current = sortedPages[i];
      const prev = sortedPages[i - 1];

      if (prev && current - prev > 1) {
        pages.push('...');
      }

      pages.push(current);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={s.pagination}>
      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: currentPage > 1 ? String(currentPage - 1) : null,
          }),
        }}
        className={classNames({
          [s['pagination__page--disabled']]: currentPage <= 1,
        })}
      >
        <SliderButton direction="left" />
      </Link>

      <div className={s.pagination__pages}>
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className={s.pagination__dots}>
              ...
            </span>
          ) : (
            <Link
              key={page}
              to={{
                search: getSearchWith(searchParams, {
                  page: page === 1 ? null : String(page),
                }),
              }}
              className={classNames(s.pagination__page, {
                [s['pagination__page--active']]: page === currentPage,
              })}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <Link
        to={{
          search: getSearchWith(searchParams, {
            page:
              currentPage < totalPages
                ? String(currentPage + 1)
                : String(currentPage),
          }),
        }}
        className={classNames({
          [s['pagination__page--disabled']]: currentPage >= totalPages,
        })}
      >
        <SliderButton direction="right" />
      </Link>
    </div>
  );
};
