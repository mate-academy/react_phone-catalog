import { NavButton } from '../../../shared/components/NavButton';
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
  const newArr = Array.from({ length: totalPage }, (_, i) => i + 1);
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
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <NavButton
        onClick={goPrev}
        disabled={currentPage === 1}
        active={currentPage > 1}
        childrenValue={'./img/image/Icons/VectorLeft.svg'}
      />

      <div className={styles.pageList}>
        {visibleNumbers.map(p => (
          <button
            key={p}
            className={`
              ${styles.buttonNav}
              ${styles.number}
              ${p === currentPage ? styles.currentPage : ''}
            `}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <NavButton
        onClick={goNext}
        disabled={currentPage === totalPage}
        active={currentPage < totalPage}
        childrenValue={'./img/image/Icons/VectorRight.svg'}
      />
    </div>
  );
};
