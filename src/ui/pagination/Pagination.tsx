import { FC, memo } from 'react';

import cn from 'classnames';

import { SearchLink } from '@components/search/';

import { scrollToTop } from '@utils/helpers/scrollToTop';

import styles from './Pagination.module.scss';

type TProps = {
  itemPerPage: number;
  length: number;
  currentPage: number;
  handlePagination: (page: number) => void;
};

export const Pagination: FC<TProps> = memo(
  ({ length, currentPage, itemPerPage, handlePagination }) => {
    const totalPages = Math.ceil(length / itemPerPage);
    const paginationNumbers = Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    );

    const onCLick = (page: number) => {
      handlePagination(page);
      scrollToTop();
    };

    return (
      <nav aria-label="Pagination Navigation">
        <ul className={styles.pagination}>
          {paginationNumbers.map(page => (
            <li
              key={page}
              onClick={() => onCLick(page)}
              className={cn(styles.item, {
                [styles.active]: currentPage === page,
              })}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              <SearchLink params={{ page: page.toString() }}>{page}</SearchLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);
