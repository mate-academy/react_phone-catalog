import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { Icon } from '../ui/Icon';
// import { useEffect, useState } from 'react';

type PaginationProps = {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  currentPage,
  totalItems,
  onPageChange,
}) => {
  const totalPagesCount = Math.ceil(totalItems / itemsPerPage);

  if (totalPagesCount === 1) {
    return null;
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <div className={classNames(styles.pagination)}>
      <ReactPaginate
        previousLabel={<Icon iconName="left" />}
        nextLabel={<Icon iconName="right" />}
        breakLabel="..."
        pageCount={totalPagesCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1} // react-paginate uses 0-based indexing
        containerClassName={styles.pagination__container}
        pageClassName={styles.pagination__btn}
        activeClassName={styles['pagination__btn--active']}
        previousClassName={classNames(
          styles.pagination__btn,
          currentPage === 1 && styles['pagination__btn--disabled'],
        )}
        nextClassName={classNames(
          styles.pagination__btn,
          currentPage === totalPagesCount &&
            styles['pagination__btn--disabled'],
        )}
        disabledClassName={styles['pagination__btn--disabled']}
        breakClassName={styles.pagination__ellipsis}
      />
    </div>
  );
};
