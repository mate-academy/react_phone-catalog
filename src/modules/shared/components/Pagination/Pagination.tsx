import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Button } from '../Button';
import { FC } from 'react';

import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { Page } from '@/types/Page';

interface Props {
  activePage: number;
  handleChangePage: (page: number) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  nextBtnDisabled: boolean;
  prevBtnDisabled: boolean;
  totalPages: number;
  visiblePages: Page[];
  className?: string;
}

export const Pagination: FC<Props> = ({
  activePage,
  handleChangePage,
  handleNextPage,
  handlePrevPage,
  nextBtnDisabled = false,
  prevBtnDisabled = false,
  totalPages,
  visiblePages,
  className,
}) => {
  if (!totalPages || totalPages <= 1) {
    return;
  }

  return (
    <div className={classNames(styles.wrapper, 'container', className)}>
      <Button
        variant="outline"
        className={styles.arrowBtn}
        isDisabled={prevBtnDisabled}
        onClick={handlePrevPage}
        size="small"
        squareBtn
        startIcon={<FaAngleLeft size={16} />}
      />

      <ol className={styles.pages}>
        {visiblePages.map((page, index) => (
          <li
            key={`${page === '...' ? `page-splitter-${index}` : `page-${page}`}`}
            className={styles.page}
          >
            {page !== '...' ? (
              <Button
                className={styles.pageBtn}
                variant="outline"
                size="small"
                squareBtn
                isSelected={activePage === page}
                onClick={() => handleChangePage(page)}
              >
                {page}
              </Button>
            ) : (
              <span className={styles.pageSplitter}>{page}</span>
            )}
          </li>
        ))}
      </ol>

      <Button
        variant="outline"
        className={styles.arrowBtn}
        isDisabled={nextBtnDisabled}
        onClick={handleNextPage}
        size="small"
        squareBtn
        startIcon={<FaAngleRight size={16} />}
      />
    </div>
  );
};
