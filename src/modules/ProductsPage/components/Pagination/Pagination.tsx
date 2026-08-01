import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { chevronRightIcon } from '@shared/assets/icons';
import { getVisiblePages } from '../../utils';
import styles from './Pagination.module.scss';

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
  const { t } = useTranslation();
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label={t('pagination.label')}>
      <button
        type="button"
        className={styles.arrow}
        aria-label={t('pagination.prev')}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img
          src={chevronRightIcon}
          alt=""
          className={cn('icon', styles.arrowIconPrev)}
        />
      </button>

      <ul className={styles.pages}>
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={cn(styles.page, {
                [styles.pageActive]: page === currentPage,
              })}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        aria-label={t('pagination.next')}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src={chevronRightIcon} alt="" className="icon" />
      </button>
    </nav>
  );
};
