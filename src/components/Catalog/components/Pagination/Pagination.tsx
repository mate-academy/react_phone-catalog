import arrowLeft from '../../../../assets/icons/arrow/left.svg';
import arrowRight from '../../../../assets/icons/arrow/right.svg';
import arrowLeftDis from '../../../../assets/icons/arrow/leftDisabled.svg';
import arrowRightDis from '../../../../assets/icons/arrow/rightDisabled.svg';

import styles from './Pagination.module.scss';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => setCurrentPage(Math.max(1, currentPage - 1));
  const handleNext = () =>
    setCurrentPage(Math.min(totalPages, currentPage + 1));

  // Логика "окна" из 5 страниц
  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.pagination__button}
      >
        <img
          src={currentPage === 1 ? arrowLeftDis : arrowLeft}
          alt="Previous"
        />
      </button>

      <div className={styles.pagination__numbers}>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${styles.pagination__number} ${
              currentPage === page ? styles.active : ''
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.pagination__button}
      >
        <img
          src={currentPage === totalPages ? arrowRightDis : arrowRight}
          alt="Next"
        />
      </button>
    </div>
  );
};
