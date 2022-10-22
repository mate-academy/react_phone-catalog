import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: string,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const amountPages = perPage === 'All' ? 0 : Math.ceil(total / +perPage);
  const isPaginationVisible = perPage === 'All' ? false : +perPage <= total;
  const pages: number[] = [];

  for (let i = 1; i <= amountPages; i += 1) {
    pages.push(i);
  }

  const handlerCurrentPage = (page: string | null) => {
    if (page) {
      onPageChange(+page);
    }
  };

  const handlerNextPage = () => {
    if (currentPage < amountPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlerPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    !isPaginationVisible
      ? null
      : (
        <div className="Pagination">
          <button
            data-cy="paginationLeft"
            type="button"
            aria-label="left"
            className="Pagination__button"
            disabled={currentPage === 1}
            onClick={handlerPrevPage}
          >
            <div className="icon icon--arrow-left" />
          </button>

          {pages.map(page => (
            <button
              type="button"
              aria-label="currentPage"
              key={page}
              className={classNames(
                'Pagination__button',
                {
                  'Pagination__button--active': page === currentPage,
                },
              )}
              onClick={
                (e) => handlerCurrentPage(e.currentTarget.textContent)
              }
            >
              <span
                className={classNames(
                  'text',
                  { 'text--white': page === currentPage },
                )}
              >
                {page}
              </span>
            </button>
          ))}

          <button
            data-cy="paginationRight"
            type="button"
            aria-label="right"
            className="Pagination__button"
            disabled={currentPage === amountPages}
            onClick={handlerNextPage}
          >
            <div className="icon icon--arrow-right" />
          </button>
        </div>
      )
  );
};
