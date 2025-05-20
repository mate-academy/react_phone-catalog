import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}) => {
  const blockSize = 4;
  const pagesAmount = Math.ceil(totalItems / itemsPerPage);
  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const blocksAmount = Math.ceil(pagesAmount / blockSize);
  const startPage = currentBlock * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, pagesAmount);

  const goToPrevBlock = () => {
    if (currentBlock > 0) {
      onPageChange((currentBlock - 1) * blockSize + 1);
    }
  };

  const goToNextBlock = () => {
    if (endPage < pagesAmount) {
      onPageChange(endPage + 1);
    }
  };

  return (
    <div className={classNames(styles.Pagination, className)}>
      <button
        className={classNames(
          styles.Pagination__arrow,
          styles.Pagination__arrowLeft,
          currentBlock === 0 && styles.Pagination__arrowLeftDisabled,
        )}
        onClick={goToPrevBlock}
        disabled={currentBlock === 0}
      ></button>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
        const page = startPage + idx;

        return (
          <button
            className={classNames(
              styles.Pagination__button,
              currentPage === page && styles.Pagination__buttonActive,
            )}
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={classNames(
          styles.Pagination__arrow,
          styles.Pagination__arrowRight,
          currentBlock === blocksAmount - 1 &&
            styles.Pagination__arrowRightDisabled,
        )}
        onClick={goToNextBlock}
        disabled={currentBlock === blocksAmount - 1}
      ></button>
    </div>
  );
};
