import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  totalPages: number,
  currentPage: number,
  handlePageChange: (newPage: number) => void,
  category: string,
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  handlePageChange,
  category,
}) => {
  const maxPagesToShow = 4;
  const pages = [];

  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = startPage + maxPagesToShow;
  } else if (currentPage >= totalPages - 2) {
    endPage = totalPages;
    startPage = endPage - maxPagesToShow;
  }

  if (startPage > 2) {
    pages.push(1, '...');
  } else {
    pages.push(1, 2);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    if (i !== 1 && i !== 2) {
      pages.push(i);
    }
  }

  if (endPage < totalPages - 1) {
    pages.push('...', totalPages);
  } else if (endPage === totalPages - 1) {
    pages.push(totalPages);
  }

  return (
    <div data-cy="pagination" className={`${category}-page__pagination pagination`}>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination__button pagination_button_l"
        data-cy="paginationLeft"
      >
        &lt;
      </button>

      {pages.map((page, index) => (
        typeof page === 'number'
          ? (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={`${page}_${index}`}
              onClick={() => handlePageChange(page)}
              className={classNames('pagination__button', {
                active: currentPage === page,
              })}
            >
              {page}
            </button>
          )
          : (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${page}_${index}`}
              className="dots"
            >
              ...
            </div>
          )
      ))}

      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination__button pagination_button_r"
        data-cy="paginationRight"
      >
        &gt;
      </button>
    </div>
  );
};
