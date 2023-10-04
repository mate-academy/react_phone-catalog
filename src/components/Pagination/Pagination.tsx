import classnames from 'classnames';

import './Pagination.scss';

type Props = {
  page: number;
  setPage: (v: string) => void;
  totalProducts: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  page,
  setPage,
  totalProducts,
  perPage,
}) => {
  const totalPages = Math.ceil(totalProducts / perPage);
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevClick = () => setPage(`${page - 1}`);
  const handleNextClick = () => setPage(`${page + 1}`);
  const handleSelect = (value: number) => () => {
    setPage(`${value}`);
  };

  return (
    <div className="Pagination" data-cy="pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        className="Pagination__button Pagination__button--prev"
        onClick={handlePrevClick}
        disabled={page <= 1}
      >
        {' '}
      </button>

      {pageButtons.map(button => (
        <button
          key={button}
          type="button"
          className={classnames(
            'Pagination__page-button',
            { 'Pagination__page-button--active': button === page },
          )}
          onClick={handleSelect(button)}
        >
          {button}
        </button>
      ))}

      <button
        type="button"
        data-cy="paginationRight"
        className="Pagination__button Pagination__button--next"
        onClick={handleNextClick}
        disabled={page >= totalPages}
      >
        {' '}
      </button>
    </div>
  );
};
