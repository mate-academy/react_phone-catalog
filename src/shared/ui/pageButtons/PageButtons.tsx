import React from 'react';
import styles from './PageButtons.module.scss';
import { getPageIndexes } from '../../utils/getPageIndexes';

type Props = {
  pages: number[];
  onPageChange: (page: number) => void;
  currentPage: number;
};

export const PageButtons: React.FC<Props> = ({
  pages,
  onPageChange,
  currentPage,
}) => {
  const { firstIndex, lastIndex } = getPageIndexes(currentPage);
  const currentPages = pages.slice(firstIndex, lastIndex);

  // eslint-disable-next-line no-console
  console.log('firstIndex, lastIndex', firstIndex, lastIndex);

  return (
    <div className={styles.pageButtons}>
      {currentPages.map(page => (
        <button
          key={page}
          className={page === currentPage ? styles.buttonActive : styles.button}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
