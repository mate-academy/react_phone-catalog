import styles from './Pagination.module.scss';
import arrowButton from '../../assets/icons/arrow-right.svg';
import { useSearchParams } from 'react-router-dom';

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const [, setSearchParams] = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (newPage: number) => {
    if (newPage !== currentPage) {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);

        if (newPage === 1) {
          params.delete('page');
        } else {
          params.set('page', newPage.toString());
        }

        return params;
      });
    }
  };

  const getVisiblePages = (): number[] => {
    const pages: number[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, 4);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        );
      }
    }

    return pages.filter(p => p >= 1 && p <= totalPages);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        <img
          src={arrowButton}
          alt=""
          className={`${styles.arrowIcon} ${styles.rotated}`}
        />
      </button>

      {visiblePages.map(pageNum => (
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          className={`${styles.pageButton} ${pageNum === currentPage ? styles.active : ''}`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        <img src={arrowButton} alt="" className={styles.arrowIcon} />
      </button>
    </div>
  );
};
