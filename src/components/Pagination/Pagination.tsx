import cn from 'classnames';

import styles from './Pagination.module.scss';
import ArrowLeft from '../../../public/img/Icons/arrow-left-Icon.svg';
import ArrowRight from '../../../public/img/Icons/arrow-right-Icon.svg';

type Props = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalPages <= 1) {
    return null;
  }

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = 4;

  let startPage = 1;

  if (currentPage <= visiblePages) {
    startPage = 1;
  } else if (currentPage > totalPages - visiblePages + 1) {
    startPage = Math.max(1, totalPages - visiblePages + 1);
  } else {
    startPage = currentPage - visiblePages + 1;
  }

  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className={styles.pagination}>
      <button
        className={cn(styles.paginationStepButton, styles.pButton, {
          [styles.notActive]: currentPage === 1,
        })}
        onClick={() => {
          onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img src={ArrowLeft} alt="arrow left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={cn(styles.paginationPageButton, styles.pButton, {
            [styles.isActive]: page === currentPage,
          })}
        >
          {page}
        </button>
      ))}

      <button
        className={cn(styles.paginationStepButton, styles.pButton, {
          [styles.notActive]: currentPage === totalPages,
        })}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(() => {
            onPageChange(
              currentPage + 1 < totalPages ? currentPage + 1 : totalPages,
            );
          }, 900);
        }}
      >
        <img src={ArrowRight} alt="arrow right" />
      </button>
    </div>
  );
};
