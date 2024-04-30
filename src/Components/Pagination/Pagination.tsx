import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { ItemsOnPage } from '../../Types/SortMethod';
import { SearchLink } from '../SearchLink';
import { scrollToTop } from '../../helpers/scrollToTop';

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
      <Button icon="arrow" onClick={scrollToTop} disabled={isFirstPage}>
        <SearchLink params={{ page: `${currentPage - 1}` }}>
          <i className="icon icon--arrow-left"></i>
        </SearchLink>
      </Button>

      <ul className="pagination__list">
        {visiblePages.map(page => (
          <li key={page}>
            <Button
              icon="number"
              onClick={scrollToTop}
              selected={page === currentPage}
            >
              <SearchLink params={{ page: `${page}` }}>{page}</SearchLink>
            </Button>
          </li>
        ))}
      </ul>

      <Button icon="arrow" onClick={scrollToTop} disabled={isLastPage}>
        <SearchLink params={{ page: `${currentPage + 1}` }}>
          <i className="icon icon--arrow-right"></i>
        </SearchLink>
      </Button>
    </div>
  );
};
