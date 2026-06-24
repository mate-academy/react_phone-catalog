import styles from './Pagination.module.scss';

type Props = {
  pages: (number | string)[];
  currentPage: number;
  totalPages: number;
  updateParams: (params: Record<string, string | null>) => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  totalPages,
  updateParams,
}) => {
  return (
    <div className={styles.paginationCatalog}>
      <button
        type="button"
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() =>
          updateParams({
            page: currentPage - 1 === 1 ? null : String(currentPage - 1),
          })
        }
      >
        {'<'}
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span className={styles.paginationEllipsis} key={`dots-${index}`}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}-${index}`}
            type="button"
            className={
              Number(page) === currentPage
                ? styles.active
                : styles.paginationButton
            }
            onClick={() =>
              updateParams({
                page: Number(page) === 1 ? null : String(page),
              })
            }
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={() =>
          updateParams({
            page: String(currentPage + 1),
          })
        }
      >
        {'>'}
      </button>
    </div>
  );
};
