import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { SliderButton } from '../../../../components/SheredNavigation';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className={styles.pagination}>
      <SliderButton
        direction="left"
        variant="round"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.buttonLeft}
      />

      {getPages().map(page => (
        <button
          key={page}
          className={classNames(styles.page, {
            [styles.active]: page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <SliderButton
        direction="right"
        variant="round"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.buttonRight}
      />
    </div>
  );
};
