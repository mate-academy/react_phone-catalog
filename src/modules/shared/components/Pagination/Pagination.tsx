import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import styles from './Pagination.module.scss';

type Props = {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const ELLIPSIS = '...';

// Сколько соседей показывать по обе стороны от текущей страницы
const SIBLINGS = 1;

// Строит список вида [1, '...', 4, 5, 6, '...', 31]:
// всегда первая и последняя, окно вокруг текущей, разрывы — многоточием
function getPageItems(
  pagesCount: number,
  currentPage: number,
): (number | typeof ELLIPSIS)[] {
  const from = Math.max(2, currentPage - SIBLINGS);
  const to = Math.min(pagesCount - 1, currentPage + SIBLINGS);

  const items: (number | typeof ELLIPSIS)[] = [1];

  if (from > 2) {
    items.push(ELLIPSIS);
  }

  for (let page = from; page <= to; page += 1) {
    items.push(page);
  }

  if (to < pagesCount - 1) {
    items.push(ELLIPSIS);
  }

  if (pagesCount > 1) {
    items.push(pagesCount);
  }

  return items;
}

export const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
}: Props) => {
  const items = getPageItems(pagesCount, currentPage);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <img src={chevronLeft} alt="" />
      </button>

      <div className={styles.pages}>
        {items.map((item, index) =>
          item === ELLIPSIS ? (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              {ELLIPSIS}
            </span>
          ) : (
            <button
              type="button"
              key={item}
              className={item === currentPage ? styles.pageActive : styles.page}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className={styles.arrow}
        disabled={currentPage === pagesCount}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <img src={chevronRight} alt="" />
      </button>
    </nav>
  );
};
