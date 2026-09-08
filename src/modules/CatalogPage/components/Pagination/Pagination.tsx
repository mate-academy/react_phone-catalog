import classNames from 'classnames';
import { getNumbers } from './utils';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { getSearchWith } from '../../../../utils/searchParams';
import { useEffect, useMemo, useState } from 'react';
import { ArrowIcon } from '../../../../components/Icons/ArrowIcon';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const pagesNum = Math.ceil(total / Number(perPage));
  const pages = useMemo(() => getNumbers(1, pagesNum), [pagesNum]);

  const [displayPages, setDisplayPages] = useState<number[]>([]);

  useEffect(() => {
    const calculateDisplayPages = () => {
      if (pagesNum <= 5) {
        return pages;
      }

      let newPages: number[] = [];

      if (currentPage <= 4) {
        newPages = [1, 2, 3, 4, 5, -1, pagesNum];
      } else if (currentPage >= pagesNum - 3) {
        newPages = [
          1,
          -1,
          pagesNum - 4,
          pagesNum - 3,
          pagesNum - 2,
          pagesNum - 1,
          pagesNum,
        ];
      } else {
        newPages = [
          1,
          -1,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          -1,
          pagesNum,
        ];
      }

      return newPages;
    };

    setDisplayPages(calculateDisplayPages());
  }, [currentPage, pagesNum, pages]);

  const [searchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    const param = page === 1 ? null : page;

    return getSearchWith({ page: param }, searchParams);
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={classNames(
          styles.pagination__pageItem,
          styles.pagination__arrow,
          {
            [styles.pagination__disabled]: currentPage === 1,
          },
        )}
      >
        <Link
          className={styles.pagination__link}
          to={{ search: handlePageChange(currentPage - 1) }}
          aria-disabled={currentPage === 1}
          onClick={e => currentPage === 1 && e.preventDefault()}
        >
          <ArrowIcon />
        </Link>
      </li>
      {displayPages.map((page, index) => (
        <li
          key={index}
          className={classNames({
            [styles.pagination__activeItem]: page === currentPage,
            [styles.pagination__pageItem]: page !== -1,
          })}
        >
          {page === -1 ? (
            <div className={styles.pagination__dots}>...</div>
          ) : (
            <Link
              to={{ search: handlePageChange(page) }}
              className={styles.pagination__link}
            >
              {page}
            </Link>
          )}
        </li>
      ))}

      <li
        className={classNames(
          styles.pagination__pageItem,
          styles.pagination__arrow,
          styles.pagination__arrowNext,
          {
            [styles.pagination__disabled]: currentPage === pages.length,
          },
        )}
      >
        <Link
          className={styles.pagination__link}
          to={{ search: handlePageChange(currentPage + 1) }}
          aria-disabled={currentPage === pages.length}
          onClick={e => currentPage === pages.length && e.preventDefault()}
        >
          <ArrowIcon />
        </Link>
      </li>
    </ul>
  );
};
