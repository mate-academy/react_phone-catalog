import cn from 'classnames';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const visibleCount = Math.min(4, totalPages);
  const currentGroupStart =
    Math.floor((currentPage - 1) / visibleCount) * visibleCount + 1;
  const firstPage = Math.min(
    currentGroupStart,
    Math.max(totalPages - visibleCount + 1, 1),
  );

  return Array.from({ length: visibleCount }, (_, index) => firstPage + index);
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useLanguage();
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label={t('pagination.label')}>
      <button
        type="button"
        className={styles.arrowButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={t('pagination.previous')}
      >
        <img
          src={getPublicPath('img/chevron-left.svg')}
          alt=""
          aria-hidden="true"
        />
      </button>

      <div className={styles.pages}>
        {visiblePages.map(page => (
          <button
            type="button"
            key={page}
            className={cn(styles.pageButton, {
              [styles.isActive]: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrowButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={t('pagination.next')}
      >
        <img
          src={getPublicPath('img/chevron-right.svg')}
          alt=""
          aria-hidden="true"
        />
      </button>
    </nav>
  );
};
