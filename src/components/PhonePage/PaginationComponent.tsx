import styles from './phonePage.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageClick: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageClick,
}) => {
  const createPagination = () => {
    const pageNumbers: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 3 ||
        i > totalPages - 3 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
        pageNumbers.push('...');
      }
    }

    return pageNumbers;
  };

  const paginationItems = createPagination();

  return (
    <div>
      <ul className={styles.ul_containter}>
        {paginationItems.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={event => {
                  event.preventDefault();
                  handlePageClick(page);
                }}
                className={`${styles.li} ${page === currentPage ? styles.active : ''}`}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ) : (
              <span className={styles.li_span}>{page}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
