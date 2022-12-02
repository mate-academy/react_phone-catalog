import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  page: number,
  totalProducts: number,
  perPage: number,
  setPage: (page: string) => void;
};

export const Pagination:React.FC<Props> = ({
  page,
  totalProducts,
  perPage,
  setPage,
}) => {
  const totalPages = Math.ceil(totalProducts / perPage);
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        type="button"
        className="button pagination__button pagination__button--prev"
        onClick={() => setPage(`${page - 1}`)}
        disabled={page <= 1}
      >
        {}
      </button>
      {pageButtons.map(value => (
        <button
          key={value}
          type="button"
          className={classNames(
            'button',
            'pagination__button',
            'pagination__button--page',
            { 'pagination__button--active': value === page },
          )}
          onClick={() => {
            setPage(`${value}`);
          }}
        >
          {value}
        </button>
      ))}
      <button
        type="button"
        className="button pagination__button pagination__button--next"
        onClick={() => setPage(`${page + 1}`)}
        disabled={page >= totalPages}
      >
        {}
      </button>
    </div>
  );
};
