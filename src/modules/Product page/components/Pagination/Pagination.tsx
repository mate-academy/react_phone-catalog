import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number; // Current page
  onPageChange: (page: number) => void; // Callback to update the page
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);

  // Hide pagination if there is only one page
  if (totalPages < 2) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const list = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <div className={classNames(styles.pagination__button)}>
        <a
          href="#prev"
          className={classNames(
            styles.pagination__link,
            {
              [styles['pagination__button_left--disabled']]: currentPage === 1,
            },
            styles.pagination__button,
          )}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          {
            <img
              src={`./img/buttons/left-arrow${currentPage === 1 ? '-disabled' : ''}.svg`}
              alt=""
            />
          }
        </a>
      </div>
      <ul className={styles.pagination__list}>
        {/* Previous Button */}

        {/* Page Numbers */}
        {list.map(p => (
          <li
            key={p}
            className={classNames(styles.pagination__item)}
            onClick={() => onPageChange(p)}
          >
            <a
              className={classNames(styles.pagination__link, {
                [styles['pagination__link--active']]: p === currentPage,
              })}
              href={`#${p}`}
            >
              {p}
            </a>
          </li>
        ))}
        {/* Next Button */}
      </ul>

      <div
        className={classNames(styles.pagination__item, {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          href="#next"
          className={classNames(
            styles.pagination__link,
            {
              [styles['pagination__button_right--disabled']]:
                currentPage === totalPages,
            },
            styles.pagination__button,
          )}
          onClick={e => {
            e.preventDefault();
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          {
            <img
              src={`./img/buttons/right-arrow${currentPage === totalPages ? '-disabled' : ''}.svg`}
              alt=""
            />
          }
        </a>
      </div>
    </div>
  );
};
