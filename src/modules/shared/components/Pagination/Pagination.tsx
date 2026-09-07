import React from 'react';
import styles from './Pagination.module.scss';
import { SliderButton } from '../../../../shared/UI/Buttons/SliderButton';
import { PaginationButton } from '../../../../shared/UI/Buttons/PaginationButton';
import { getPaginationPage } from '../../utils/getPaginationPage';

interface Props {
  classNames?: string;
  totalItem: number;
  itemsPerPage: number;
  currPage?: number;
  onPageChange?: (phage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalItem,
  itemsPerPage,
  currPage = 1,
  onPageChange = () => {},
}) => {
  const totalPage = Math.ceil(totalItem / itemsPerPage);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <SliderButton
        onClick={() => onPageChange(currPage - 1)}
        direction="left"
        disabled={currPage === 1}
        className={styles.chevron}
      />

      <div className={styles.pagination__buttons}>
        {getPaginationPage(currPage, totalPage).map((page, i) =>
          page === '...' ? (
            <span key={`${page}-${i}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <PaginationButton
              key={page}
              page={page}
              classNames={styles.pagination__button}
              selected={currPage === page}
              onClick={() => onPageChange(page)}
            />
          ),
        )}
      </div>

      <SliderButton
        onClick={() => onPageChange(currPage + 1)}
        direction="right"
        disabled={currPage === totalPage}
        className={styles.chevron}
      />
    </div>
  );
};
