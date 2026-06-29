import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Pag from './Pagination.module.scss';
import cn from 'classnames';

type Props = {
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({ pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  const setPage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);

    if (pageNum <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(pageNum));
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push('...');
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(pageCount - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < pageCount - 2) {
      pages.push('...');
    }

    pages.push(pageCount);

    return pages;
  };

  return (
    <div className={Pag.pagination}>
      <button
        className={cn(Pag.pagination__button, Pag.pagination__button__prev)}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      />
      <div className={Pag.pagination__pages}>
        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className={Pag.pagination__dots}>
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(Pag.pagination__button, {
                [Pag.pagination__button__active]: p === page,
              })}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === pageCount}
        className={cn(Pag.pagination__button, Pag.pagination__button__next)}
      />
    </div>
  );
};
