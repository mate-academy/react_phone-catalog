import styles from './Pagination.module.scss';
import { ArrowsPagination } from '../ArrowsPagination';
import { useSearchParams } from 'react-router-dom';

type Props = {
  page: number;
  totalPages: number;
};

export const Pagination = ({ page, totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPageNumbers = () => {
    const range = 3;
    const groupStart = Math.floor((page - 1) / range) * range + 1;
    const groupEnd = Math.min(totalPages, groupStart + range - 1);

    const pages = [];

    for (let i = groupStart; i <= groupEnd; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    });

    window.scrollTo({ top: 0 });
  };

  const handleNextPage = () => {
    if (page <= totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page >= 1) {
      handlePageChange(page - 1);
    }
  };

  const pageNumbers = getPageNumbers();
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <>
      <div className={styles.paginateWrapper}>
        <div className={styles.paginate}>
          <div className={styles.paginate__btn}>
            <ArrowsPagination
              iconType="arrowPrev"
              disabled={isPrevDisabled}
              onClick={handlePrevPage}
            />
          </div>

          <div className={styles.paginate__pages}>
            {pageNumbers.map(num => (
              <button
                key={num}
                className={`${styles.paginate__page} ${num === page ? styles.active : ''}`}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}
          </div>

          <div className={styles.paginate__btn}>
            <ArrowsPagination
              iconType="arrowNext"
              disabled={isNextDisabled}
              onClick={handleNextPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};