import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './CatalogPagination.module.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  pages: number[];
  setIsActivePage: Dispatch<SetStateAction<number>>;
  isActivePage: number;
  handlePage: (val: number) => void;
  currentPage: number | null;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: string;
};

export const CatalogPagination: FC<Props> = ({
  pages,
  setIsActivePage,
  isActivePage,
  handlePage,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam: number | null = searchParams.get('page');

  const paginationWidth = 4;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(paginationWidth);

  const visiblePagination = [...pages.slice(startIndex, endIndex)];

  const blockOfPagination = Math.floor((currentPage - 1) / paginationWidth);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (pageParam !== null) {
      setCurrentPage(pageParam);
      setStartIndex(blockOfPagination * paginationWidth);
      setEndIndex((blockOfPagination + 1) * paginationWidth);
      handlePage(pageParam);
    } else {
      handlePage(currentPage);
    }
  }, []);

  useEffect(() => {
    if (
      visiblePagination.indexOf(currentPage) === -1 &&
      visiblePagination[0] > currentPage
    ) {
      setStartIndex(prev => prev - paginationWidth);
      setEndIndex(prev => prev - paginationWidth);
    } else if (visiblePagination.indexOf(currentPage) === -1) {
      setStartIndex(prev => prev + paginationWidth);
      setEndIndex(prev => prev + paginationWidth);
    }
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => {
          if (currentPage > 1) {
            handlePage(currentPage !== null ? currentPage - 1 : 1);
          }
        }}
        className={styles.arrow}
      >
        ‹
      </button>
      <div className={styles.pages__buttons}>
        {visiblePagination.map((page, index) => {
          return (
            <button
              onClick={() => {
                setIsActivePage(page);
                handlePage(page);
              }}
              key={index}
              className={`${styles.button} ${Number(currentPage) === page ? styles.button__active : ''}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (currentPage < pages.length) {
            handlePage(currentPage !== null ? Number(currentPage) + 1 : 1);
          }
        }}
        className={styles.arrow}
      >
        ›
      </button>
    </div>
  );
};
