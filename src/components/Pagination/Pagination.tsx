import { useTranslation } from '../../hooks';
import { IconButton } from '../IconButton';
import { PaginationButton } from '../PaginationButton';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const VISIBLE_PAGES_COUNT = 4;

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pagesCount = Math.min(VISIBLE_PAGES_COUNT, totalPages);

  let startPage = currentPage - Math.floor(pagesCount / 2);

  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + pagesCount - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - pagesCount + 1, 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const t = useTranslation();

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={styles.pagination}
      aria-label={t.common.pagination.navigation}
    >
      <IconButton
        icon="chevronLeft"
        label={t.common.pagination.previousPage}
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <ul className={styles.list}>
        {visiblePages.map(page => {
          const label =
            page === currentPage
              ? `${t.common.pagination.currentPage}: ${page}`
              : `${t.common.pagination.goToPage} ${page}`;

          return (
            <li className={styles.item} key={page}>
              <PaginationButton
                page={page}
                label={label}
                isSelected={page === currentPage}
                onClick={() => onPageChange(page)}
              />
            </li>
          );
        })}
      </ul>

      <IconButton
        icon="chevronRight"
        label={t.common.pagination.nextPage}
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
};
