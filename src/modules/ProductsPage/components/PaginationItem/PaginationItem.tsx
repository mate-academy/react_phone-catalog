import React from 'react';
import styles from './PaginationItem.module.scss';
import { getSearchWith } from '../../utils/getSearchWith';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  pages: number[];
  numberOfPage: string;
  slicedPages: number[];
  setSlicedPages: React.Dispatch<React.SetStateAction<number[]>>;
};

export const PaginationItem: React.FC<Props> = ({
  pages,
  numberOfPage,
  slicedPages,
  setSlicedPages,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (direction: 'left' | 'right') => {
    setSlicedPages(prev => {
      if (!prev.length || !pages.length) {
        return prev;
      }

      const currentFirstIndex = pages.indexOf(prev[0]);
      let firstIndex = currentFirstIndex;
      let lastIndex = firstIndex + 4;

      if (
        direction === 'right' &&
        prev[prev.length - 1] < pages[pages.length - 1]
      ) {
        firstIndex = currentFirstIndex + 1;
        lastIndex = firstIndex + 4;
      }

      if (direction === 'left' && prev[0] > pages[0]) {
        firstIndex = currentFirstIndex - 1;
        lastIndex = firstIndex + 4;
      }

      firstIndex = Math.max(firstIndex, 0);
      lastIndex = Math.min(lastIndex, pages.length);

      return pages.slice(firstIndex, lastIndex);
    });
  };

  const handlePageChange = (currentPage: number) => {
    const newParams = getSearchWith({ page: currentPage }, searchParams);

    navigate({ pathname, search: `?${newParams}` });
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__container}>
        <div
          className={styles.pagination__arrowleft}
          onClick={() => handleClick('left')}
        >
          {'<'}
        </div>
        <div className={styles.pagination__pages}>
          {slicedPages.map(page => (
            <div
              key={page}
              className={`${styles.pagination__page} ${+numberOfPage === page ? styles.pagination__active : ''}`}
              onClick={() => {
                handlePageChange(page);
              }}
            >
              {page}
            </div>
          ))}
        </div>

        <div
          className={styles.pagination__arrowright}
          onClick={() => handleClick('right')}
        >
          {'>'}
        </div>
      </div>
    </div>
  );
};
