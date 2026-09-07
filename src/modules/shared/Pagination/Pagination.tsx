import React, { useMemo } from 'react';
import styles from './Pagination.module.scss';
import { getPaginationButtons } from '../../../utils/getPaginationButtons';
import { SliderButton } from '../SliderButton';
import { Arrow } from '../Icons/Arrow/Arrow';
import { PaginationButton } from '../PaginationButton';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = useMemo(
    () => Math.ceil(total / perPage),
    [perPage, total],
  );

  const buttons = useMemo(
    () => getPaginationButtons(pagesCount, currentPage),
    [pagesCount, currentPage],
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    scrollToTop();
  };

  return (
    <div className={styles.Pagination}>
      <SliderButton
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        <Arrow orientation="left" />
      </SliderButton>

      <div className={styles.Pagination__buttons}>
        {buttons.map(num => {
          if (num === -1) {
            return (
              <PaginationButton
                key={num}
                onClick={() => handlePageChange(currentPage - 2)}
              >
                ...
              </PaginationButton>
            );
          }

          if (num === 0) {
            return (
              <PaginationButton
                key={num}
                onClick={() => handlePageChange(currentPage + 2)}
              >
                ...
              </PaginationButton>
            );
          }

          return (
            <PaginationButton
              key={num}
              isActive={currentPage === num}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </PaginationButton>
          );
        })}
      </div>

      <SliderButton
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === pagesCount}
      >
        <Arrow orientation="right" />
      </SliderButton>
    </div>
  );
};
