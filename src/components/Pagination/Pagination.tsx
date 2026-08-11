import styles from './Pagination.module.scss';

type Props = {
  totalPosts: number;
  postsPerPage: number | string;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

export const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: Props) => {
  const totalPages = [];

  if (postsPerPage !== 'All') {
    const perPage = Number(postsPerPage);

    for (let i = 1; i <= Math.ceil(totalPosts / perPage); i++) {
      totalPages.push(i);
    }
  }

  if (totalPages.length < 2) {
    return null;
  }

  const visibleCount = 4;
  let start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages.length, start + visibleCount - 1);

  if (end - start + 1 < visibleCount) {
    start = Math.max(1, end - visibleCount + 1);
  }

  const visiblePages = totalPages.slice(start - 1, end);

  return (
    <div className={styles.pagination}>
      {visiblePages.map(page => (
        <button
          className={`${styles.pagination__button} ${
            page === currentPage ? styles['pagination__button--active'] : ''
          }`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
