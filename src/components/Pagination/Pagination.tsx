import './Pagination.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props) => {
  const visiblePagesCount = 4;

  const firstVisiblePage =
    Math.floor((currentPage - 1) / visiblePagesCount) * visiblePagesCount + 1;

  const lastVisiblePage = Math.min(
    firstVisiblePage + visiblePagesCount - 1,
    totalPages,
  );

  const visiblePages = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__array"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {visiblePages.map(page => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage
              ? 'pagination__button pagination__button--active'
              : 'pagination__button'
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination__array"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
};
