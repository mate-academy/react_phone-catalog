import classNames from 'classnames';
import { FC } from 'react';
import '../styles/pagination.scss';

type Props = {
  productsLength: number,
  list: number,
  currentPage: number,
  setCurrentPage: (page:number) => void,
};

export const Pagination:FC<Props> = ({
  productsLength,
  list,
  currentPage,
  setCurrentPage,
}) => {
  const numberOfPages = Math.ceil(productsLength / list);
  const arrayOfPages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  return (
    <div className="pagination" data-cy="pagination">
      <button
        type="button"
        className="pagination__button"
        data-cy="paginationLeft"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <i className="fas fa-chevron-left" />
      </button>

      {arrayOfPages.map(arrayPage => (
        <button
          type="button"
          data-cy="paginationRight"
          className={classNames('pagination__button',
            { 'pagination__button--active': arrayPage === currentPage })}
          onClick={() => setCurrentPage(arrayPage)}
        >
          {arrayPage}
        </button>
      ))}

      <button
        type="button"
        className="pagination__button"
        disabled={currentPage === numberOfPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
};
