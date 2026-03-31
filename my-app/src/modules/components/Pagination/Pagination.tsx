import './Pagination.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ total, perPage, currentPage, onPageChange }: Props) => {
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &#8249;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination__page${page === currentPage ? ' pagination__page--active' : ''}`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        aria-label="Next page"
      >
        &#8250;
      </button>
    </div>
  );
};
