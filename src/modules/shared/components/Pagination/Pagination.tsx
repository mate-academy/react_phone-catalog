import classNames from 'classnames';
import styles from './Pagination.module.scss';

const MAX_VISIBLE_PAGES = 4;

const CHEVRON_LEFT_PATH = `M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z`;

const CHEVRON_RIGHT_PATH = `M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z`;

export interface PaginationProps {
    total: number;
    perPage: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    total,
    perPage,
    currentPage = 1,
    onPageChange,
}: PaginationProps) => {
    const totalPages = Math.ceil(total / perPage);

    if (totalPages <= 1) {
        return null;
    }

    const currentGroup = Math.floor((currentPage - 1) / MAX_VISIBLE_PAGES);
    const startPage = currentGroup * MAX_VISIBLE_PAGES + 1;
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);
    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
    );

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            <button
                className={styles.pagination__button__prev}
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
            >
                <svg
                    className={styles.pagination__chevronLeft}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d={CHEVRON_LEFT_PATH}
                        fill="currentColor"
                    />
                </svg>
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    className={classNames(styles.pagination__button, {
                        [styles['pagination__button--active']]:
                            currentPage === page,
                    })}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles.pagination__button__next}
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
            >
                <svg
                    className={styles.pagination__chevronRight}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d={CHEVRON_RIGHT_PATH}
                        fill="currentColor"
                    />
                </svg>
            </button>
        </nav>
    );
};
