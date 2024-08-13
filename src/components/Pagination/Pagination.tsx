import cn from 'classnames';

import { useSearchParams } from 'react-router-dom';

import { IconLeft } from '../../ui/IconLeft';
import { IconRight } from '../../ui/IconRight';

import { useMemo } from 'react';
import { getAmountPages } from '../../utils/getAmountPages';

import { DEFAULT_PAGE } from '../../constants/pagination';
import { paginateVisiblePages } from '../../utils/paginateVisiblePages';

import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  defaultPage?: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  defaultPage = DEFAULT_PAGE,
}) => {
  const amountPages = Math.floor(total / perPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get('page') || defaultPage);
  const numberOfPages = getAmountPages(amountPages);

  const pages = useMemo(
    () => paginateVisiblePages(numberOfPages, currentPage),
    [currentPage, numberOfPages],
  );

  const handleChangePage = (page: number) => {
    const urlParams = new URLSearchParams(searchParams);

    urlParams.set('page', page.toString());

    setSearchParams(urlParams);
  };

  const handleNextPage = () => {
    if (currentPage < amountPages) {
      handleChangePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > DEFAULT_PAGE) {
      handleChangePage(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        className={cn(styles.button, styles['button--primary'])}
      >
        <IconLeft fill="white" />
      </button>
      <div className={styles.inner}>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            disabled={page === amountPages}
            className={cn(styles.button, {
              [styles['button--active']]: currentPage === page,
            })}
          >
            {page === amountPages ? '...' : page}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextPage}
        className={cn(styles.button, styles['button--primary'])}
      >
        <IconRight fill="white" />
      </button>
    </div>
  );
};
