import cn from 'classnames';
import styles from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
};

const getNumbers = (from: number, to: number): number[] => {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  const from = currentPage > 4 ? currentPage - 3 : 1;
  const to = from + 6;

  const pages = getNumbers(from, to > totalPages ? totalPages : to);

  return (
    <>
      <ul className={styles.pagination}>
        <li
          className={cn(styles.item, {
            [styles.disabled]: currentPage === 1,
          })}
        >
          <a
            className={styles.navLink}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={cn(styles.item, {
              [styles.active]: page === currentPage,
            })}
          >
            <a
              className={styles.link}
              onClick={() => page !== currentPage && onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn(styles.item, {
            [styles.disabled]: currentPage === totalPages,
          })}
        >
          <a
            className={styles.navLink}
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={() =>
              currentPage !== totalPages && onPageChange(currentPage + 1)
            }
          >
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </li>
      </ul>
    </>
  );
};
