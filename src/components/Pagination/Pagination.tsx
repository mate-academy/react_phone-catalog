import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { ArrowIcon } from '../Icons/Arrow';

type Props = {
  pages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

type ToggleDirection = 'next' | 'prev';

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const [pagesList, setPagesList] = useState<number[]>([]);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === pages;

  const pageArray = () => {
    const pagesNums: number[] = [];

    for (let i = 1; i <= pages; i++) {
      pagesNums.push(i);
    }

    setPagesList(pagesNums);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const togglePage = (direction: ToggleDirection) => {
    setCurrentPage(direction === 'next' ? currentPage + 1 : currentPage - 1);
  };

  useEffect(() => {
    pageArray();
  }, [pages]);

  return (
    <div className={styles.pagination}>
      <button
        className="toggle button backBtn"
        disabled={currentPage === 1}
        onClick={() => {
          togglePage('prev');
        }}
      >
        <span className="icon">
          <ArrowIcon disabled={prevDisabled} />
        </span>
      </button>

      <div className={styles.numbersList}>
        {pagesList.map(number => (
          <button
            key={number}
            className={classNames('button pageToggle', {
              'pageToggle-active': currentPage === number,
            })}
            onClick={() => handlePageChange(number)}
          >
            <span className={styles.pageButton}>{number}</span>
          </button>
        ))}
      </div>

      <button
        className="toggle button"
        disabled={currentPage === pages}
        onClick={() => {
          togglePage('next');
        }}
      >
        <span className="icon">
          <ArrowIcon disabled={nextDisabled} />
        </span>
      </button>
    </div>
  );
};
