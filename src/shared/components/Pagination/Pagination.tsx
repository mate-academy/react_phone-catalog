import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const startPage = Math.min(
    Math.max(1, currentPage - 1),
    Math.max(1, totalPages - 3),
  );

  const visiblePages = Array.from(
    { length: 4 },
    (_, index) => startPage + index,
  ).filter(page => page <= totalPages);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <img
          src={`${import.meta.env.BASE_URL}/img/buttons/arrow-left.png`}
          alt="button-arrow-left"
        />
      </button>
      {visiblePages.map(page => (
        <button
          key={page}
          type="button"
          className={`${styles.pagination__item}
        ${currentPage === page ? styles['pagination__item--active'] : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {' '}
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.arrow}
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <img
          src={`${import.meta.env.BASE_URL}/img/buttons/arrow-right.png`}
          alt="arrow-right"
        />
      </button>
    </div>
  );
};
