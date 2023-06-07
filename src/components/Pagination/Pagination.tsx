import classNames from 'classnames';

type Props = {
  totalPages: number,
  currentPage: number,
  handlePageChange: (newPage: number) => void,
  category: string,
};

export const Pagination: React.FC<Props> = ({
  totalPages, currentPage, handlePageChange, category,
}) => {
  return (
    <div data-cy="pagination" className={`${category}-page__pagination`}>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${category}-page__button`}
        data-cy="paginationLeft"
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            type="button"
            key={index}
            onClick={() => handlePageChange(pageNumber)}
            className={classNames(`${category}-page__button`, {
              active: currentPage === pageNumber,
            })}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${category}-page__button`}
        data-cy="paginationRight"
      >
        &gt;
      </button>
    </div>
  );
};
