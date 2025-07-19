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

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
          >
            {pageNum}
          </button>
        );
      })}

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
