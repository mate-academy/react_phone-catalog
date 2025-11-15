import { useNavigate, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../Icon/Icon';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const safePerPage = Math.max(1, perPage);
  const totalPages = Math.ceil(total / safePerPage);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    return `?${params.toString()}`;
  };

  const handleClick = (page: number) => {
    navigate(getPageUrl(page));
  };

  const getVisiblePages = (
    current: number,
    totalPagesCount: number,
    visibleCount: number = 4,
  ) => {
    let start = current - 1;
    let end = start + visibleCount - 1;

    if (start < 1) {
      start = 1;
      end = Math.min(totalPagesCount, start + visibleCount - 1);
    }

    if (end > totalPagesCount) {
      end = totalPagesCount;
      start = Math.max(1, end - visibleCount + 1);
    }

    const pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__wrapper}>
        <div className={styles.pagination__list}>
          <button
            className={cn(styles['pagination__arrow-item'], {
              [styles.disabled]: currentPage === 1,
            })}
            onClick={() => handleClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Icon
              name={currentPage === 1 ? 'arrow_left_disabled' : 'arrow_left'}
            />
          </button>

          <div className={cn(styles['pagination__items-container'])}>
            {getVisiblePages(currentPage, totalPages).map(page => (
              <button
                key={page}
                className={cn(styles['pagination__page-item'], {
                  [styles.active]: page === currentPage,
                })}
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={cn(styles['pagination__arrow-item'], {
              [styles.disabled]: currentPage === totalPages,
            })}
            onClick={() => handleClick(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <Icon
              name={
                currentPage === totalPages
                  ? 'arrow_right_disabled'
                  : 'arrow_right'
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};
