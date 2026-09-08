import classNames from 'classnames';
import { icons } from '../../constants/icons';
import { Icon } from '../icons';
import styles from './pagination.module.scss';

type Props = {
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
  containerRef: React.RefObject<HTMLDivElement>;
  goPrev: () => void;
  goNext: () => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  handlePageChange,
  currentPage,
  containerRef,
  goNext,
  goPrev,
}) => {
  const numPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNumPageChange = () => {
    const visibleCount = 4;
    const total = numPages.length;

    let start = currentPage - 2;
    let end = start + visibleCount;

    if (total < visibleCount) {
      start = 0;
      end = total;
    }

    if (start < 0) {
      start = 0;
      end = visibleCount;
    }

    if (end > total) {
      end = total;
      start = total - visibleCount;
    }

    return [...numPages].slice(start, end);
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === numPages.length;
  const visiblePages = handleNumPageChange();

  return (
    <div className={styles.pagination}>
      <button className={styles['button-img']} onClick={goPrev}>
        {isPrevDisabled ? (
          <Icon icon={icons.arrowLeftDisabled} />
        ) : (
          <Icon icon={icons.arrowLeft} />
        )}
      </button>
      <div className={styles.paginationNum} ref={containerRef}>
        {visiblePages.map(pageNum => (
          <button
            key={pageNum}
            className={classNames(styles['button-img'], {
              [styles.active]: currentPage === pageNum,
            })}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button className={styles['button-img']} onClick={goNext}>
        {isNextDisabled ? (
          <Icon icon={icons.arrowRightDisabled} />
        ) : (
          <Icon icon={icons.arrowRight} />
        )}
      </button>
    </div>
  );
};
