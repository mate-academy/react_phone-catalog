import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Button } from '../Button';
import { FC } from 'react';

import styles from './Pagination.module.scss';
import classNames from 'classnames';

interface Props {
  activePage: number;
  handleChangePage: (page: number) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  nextBtnDisabled: boolean;
  prevBtnDisabled: boolean;
  totalPages: number;
  visiblePages: number[];
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
}) => {
  if (!totalPages || totalPages <= 1) {
    return;
  }

  return (
    <div className={classNames(styles.wrapper, 'container')}>
      <Button
        variant="outline"
        radius="50%"
        isIconOnly
        className={styles.arrowBtn}
        isDisabled={prevBtnDisabled}
        onClick={handlePrevPage}
      >
        <FaAngleLeft size={16} />
      </Button>

      <ol className={styles.pages}>
        {visiblePages.map(page => (
          <li key={`page-${page}`} className={styles.page}>
            <Button
              className={styles.pageBtn}
              variant="outline"
              radius="50%"
              isSelected={activePage === page}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </Button>
          </li>
        ))}
      </ol>

      <Button
        variant="outline"
        radius="50%"
        isIconOnly
        className={styles.arrowBtn}
        isDisabled={nextBtnDisabled}
        onClick={handleNextPage}
      >
        <FaAngleRight size={16} />
      </Button>
    </div>
  );
};
