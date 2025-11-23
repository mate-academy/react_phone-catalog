import scss from './Pagination.module.scss';
import { ButtonArrow } from '../../../shared/components/ButtonArrow';
import classNames from 'classnames';

interface Props {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const PAGE_WINDOW = 4;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  let startIndex = Math.max(0, currentPage - 1);

  if (currentPage > total - PAGE_WINDOW + 1) {
    startIndex = total - PAGE_WINDOW;
  }

  if (total <= PAGE_WINDOW) {
    startIndex = 0;
  }

  const endIndex = Math.min(total, startIndex + PAGE_WINDOW);

  return (
    <div className={scss.pagination} role="navigation" aria-label="pagination">
      <ButtonArrow
        direction="left"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <ul className={scss.pagination__pages}>
        {pages.slice(startIndex, endIndex).map(page => {
          return (
            <li key={page}>
              <button
                type="button"
                className={classNames(scss.pagination__page, {
                  [scss.pagination__page_active]: page === currentPage,
                })}
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
      <ButtonArrow
        direction="right"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === total}
      />
    </div>
  );
};
