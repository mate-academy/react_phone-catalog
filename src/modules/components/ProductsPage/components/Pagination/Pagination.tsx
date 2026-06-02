import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';

import styles from './Pagination.module.scss';

const { pagination, arrowBtn, pagesBlock, pageBtn, pageBtnActive } = styles;

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className={pagination}>
      <button
        type="button"
        className={arrowBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrowLeft} alt="Previous" />
      </button>

      <div className={pagesBlock}>
        {pageNumbers.map(num => (
          <button
            key={num}
            type="button"
            className={`${pageBtn} ${num === currentPage ? pageBtnActive : ''}`}
            onClick={() => onPageChange(num)}
          >
            <span>{num}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={arrowBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={arrowRight} alt="Next" />
      </button>
    </div>
  );
};
