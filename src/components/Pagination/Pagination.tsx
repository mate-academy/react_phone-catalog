import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { Icon } from '../ui/Icon';
import { useEffect, useState } from 'react';

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
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const calculateVisiblePages = () => {
    const pages = Array.from(
      {
        length: totalPagesCount,
      },
      (_, i) => i + 1,
    );

    setVisiblePages(pages);
  };

  useEffect(() => {
    calculateVisiblePages();

    // Handle resizing if you need it for ellipsis logic later
    const handleResize = () => {
      // eslint-disable-next-line
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [currentPage, totalItems]);

  // If there's only one page, no need to display pagination
  if (totalPagesCount === 1) {
    return null;
  }

  return (
    <div className={classNames(styles.pagination)}>
      <button
        className={classNames(styles.pagination__btn, {
          [styles['pagination__btn--disabled']]: currentPage === 1,
        })}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon iconName="left" />
      </button>

      <div className={classNames(styles.pagination__pages)}>
        {visiblePages.map((number, index) =>
          typeof number === 'number' ? (
            <button
              key={index}
              className={classNames(styles.pagination__btn, {
                [styles['pagination__btn--active']]: currentPage === number,
              })}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          ) : (
            <span key={index} className={styles.pagination__ellipsis}>
              {number}
            </span>
          ),
        )}
      </div>

      <button
        className={classNames(styles.pagination__btn, {
          [styles['pagination__btn--disabled']]:
            currentPage === totalPagesCount,
        })}
        disabled={currentPage === totalPagesCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon iconName="right" />
      </button>
    </div>
  );
};
