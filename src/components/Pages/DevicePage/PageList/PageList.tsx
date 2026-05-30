import React, { useState } from 'react';
import cn from 'classnames';
import { Product } from '../../../type/Product';
import { CardList } from '../../../ProductCard/CardList/CardList';
import './PageList.scss';
import '../../../text.scss';
import { Loader } from '../../../Loader';

type Props = {
  total: Product[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PageList: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(total.length / perPage);

  const generatePages = () => {
    const visiblePages = 4;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  };

  const pages = generatePages();

  const onPageChangeWithLoader = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      onPageChange(page);
      setIsLoading(false);
    }, 500);
  };

  const prevClickPage = () => {
    if (currentPage > 1) {
      onPageChangeWithLoader(currentPage - 1);
    }
  };

  const nextClickPage = () => {
    if (currentPage < totalPages) {
      onPageChangeWithLoader(currentPage + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <CardList
          listProduct={total.slice(
            currentPage * perPage - perPage,
            currentPage * perPage,
          )}
        />
      )}
      {totalPages !== 1 ? (
        <ul className="page__list">
          {totalPages > 4 && (
            <li
              className={cn(
                'page__item',
                'page__item--next-prev',
                'page__item--prev',
                {
                  disabled: currentPage === 1,
                },
              )}
              onClick={e => {
                e.preventDefault();
                if (currentPage > 1) {
                  prevClickPage();
                }
              }}
              aria-disabled={currentPage === 1}
            />
          )}

          {pages.map(page => (
            <li
              key={page}
              className={cn('page__item', {
                'page__item--active': page === currentPage,
              })}
              onClick={e => {
                e.preventDefault();
                onPageChangeWithLoader(page);
              }}
            >
              <a
                className={cn('page__link', 'text--body', {
                  'page__link--active': page === currentPage,
                })}
                href={`#${page}`}
              >
                {page}
              </a>
            </li>
          ))}

          {totalPages > 4 && (
            <li
              className={cn(
                'page__item',
                'page__item--next-prev',
                'page__item--next',
                {
                  disabled: currentPage === totalPages,
                },
              )}
              onClick={e => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  nextClickPage();
                }
              }}
            />
          )}
        </ul>
      ) : (
        <p className="page__list"></p>
      )}
    </>
  );
};
