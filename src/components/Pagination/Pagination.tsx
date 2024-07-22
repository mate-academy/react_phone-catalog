import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { IconLeft } from '../../ui/IconLeft';
import { IconRight } from '../../ui/IconRight';

import { DEFAULT_PAGE } from '../../constants/default-values';

import { useEffect, useState } from 'react';
import { getAmountPages } from '../../utils/getAmountPages';
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
  const numberOfpages = getAmountPages(amountPages);

  const [pages, setPages] = useState<number[]>([]);

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

  useEffect(() => {
    let tempNumberOfPages = [...numberOfpages];
    const maxPages = 4;
    const n = Math.ceil(currentPage / maxPages) - 1;

    const items = tempNumberOfPages.slice(
      maxPages * n,
      maxPages + maxPages * n,
    );

    tempNumberOfPages = [...items, numberOfpages.length];

    if (maxPages + maxPages * n > numberOfpages.length - 1) {
      tempNumberOfPages = [...items];
    }

    setPages(tempNumberOfPages);
  }, [currentPage, amountPages]);

  return (
    <div className={styles.PaginationWrapper}>
      <button onClick={handlePrevPage} className={styles.ButtonPrimary}>
        <IconLeft fill="white" />
      </button>
      <div className={styles.Inner}>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            className={cn(styles.Button, {
              [styles.Active]: currentPage === page,
            })}
          >
            {page === amountPages ? '...' : page}
          </button>
        ))}
      </div>
      <button onClick={handleNextPage} className={styles.ButtonPrimary}>
        <IconRight fill="white" />
      </button>
    </div>
  );
};
