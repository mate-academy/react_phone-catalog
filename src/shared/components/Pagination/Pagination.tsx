import ReactPaginate from 'react-paginate';

import ArrowUpIcon from '@/assets/icons/arrow-up.svg?react';
import { useMediaQuery } from '@/shared/hooks';
import { cn } from '@/shared/utils';

import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: { selected: number }) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props) => {
  const { isMobile } = useMediaQuery();

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      pageRangeDisplayed={isMobile ? 1 : 3}
      marginPagesDisplayed={1}
      previousLabel={<ArrowUpIcon className={styles.arrowPrev} />}
      nextLabel={<ArrowUpIcon className={styles.arrowNext} />}
      breakLabel="..."
      onPageChange={onPageChange}
      containerClassName={styles.container}
      pageClassName={styles.page}
      pageLinkClassName={cn(styles.cell, styles.pageLink)}
      activeLinkClassName={styles.activeLink}
      previousClassName={styles.nav}
      previousLinkClassName={cn(styles.cell, styles.navLink)}
      nextClassName={styles.nav}
      nextLinkClassName={cn(styles.cell, styles.navLink)}
      breakClassName={styles.break}
      breakLinkClassName={cn(styles.cell, styles.breakLink)}
      disabledLinkClassName={styles.disabled}
    />
  );
};
