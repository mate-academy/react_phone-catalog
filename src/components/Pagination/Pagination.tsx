import type { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';
import styles from './Pagination.module.scss';
import ArrowLeft from '/icons/arrow_left_active.svg';
import ArrowRight from '/icons/arrow_right_active.svg';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const isLargeScreen = useMediaQuery({ minWidth: 640 });
  const pageRangeDisplayed = isLargeScreen ? 3 : 1;

  if (totalPages < 1) return null;

  return (
    <nav
      className={styles.pagination}
      aria-label="Pagination"
    >
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <img
            src={ArrowRight}
            alt="Next"
            className="app-icon"
          />
        }
        previousLabel={
          <img
            src={ArrowLeft}
            alt="Previous"
            className="app-icon"
          />
        }
        onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={1}
        containerClassName={styles.paginationList}
        pageClassName={styles.paginationItem}
        pageLinkClassName={styles.pageButton}
        previousClassName={styles.paginationItem}
        previousLinkClassName={styles.navButton}
        nextClassName={styles.paginationItem}
        nextLinkClassName={styles.navButton}
        breakClassName={styles.paginationItem}
        breakLinkClassName={styles.pageButton}
        activeClassName={styles.selected}
        disabledClassName={styles.unselected}
        disabledLinkClassName={styles.navButtonDisabled}
      />
    </nav>
  );
};
