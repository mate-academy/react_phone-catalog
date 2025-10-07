import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (p: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  onPageChange,
}) => {
  const newArr = Array.from({ length: totalPage }, (_, i) => i);
  const itemsPerList = 4;

  let visibleNumbers: number[];

  if (totalPage <= itemsPerList) {
    visibleNumbers = newArr;
  } else if (currentPage < itemsPerList) {
    visibleNumbers = newArr.slice(0, itemsPerList);
  } else {
    visibleNumbers = newArr.slice(
      currentPage - (itemsPerList - 1),
      currentPage + 1,
    );
  }

  const goNext = () => {
    if (currentPage < totalPage - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.buttonNav}
        onClick={goPrev}
        disabled={currentPage === 0}
      >
        «
      </button>

      <div className={styles.pageList}>
        {visibleNumbers.map(p => (
          <button
            key={p}
            className={styles.buttonNav}
            style={{
              backgroundColor: p === currentPage ? '#905BFF' : '#161827',
            }}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        ))}
      </div>

      <button
        className={styles.buttonNav}
        onClick={goNext}
        disabled={currentPage === totalPage - 1}
      >
        »
      </button>
    </div>
  );
};
