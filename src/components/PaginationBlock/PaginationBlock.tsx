import classNames from 'classnames';
import './PaginationBlock.scss';
import { usePagination, DOTS } from '../../helpers/usePagination';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationBlock: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    totalCount: total,
    pageSize: perPage,
    currentPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const handlePageClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget;

    if (+id === currentPage) {
      return;
    }

    onPageChange(+id);
  };

  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className="products-page__pagination pagination"
      data-cy="pagination"
    >
      <li className="pagination__button-prev pagination__button--mobile">
        <button
          data-cy="paginationLeft"
          type="button"
          className="
            pagination-button
            pagination-button--prev
            pagination__button
          "
          aria-label="buttonPrev"
          disabled={currentPage === 1}
          onClick={handlePrevClick}
        />
      </li>

      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li
              className="pagination__item dots"
              key={`${Math.random()}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          (
            <li
              className="pagination__item"
              key={pageNumber}
            >
              <button
                className={classNames(
                  'pagination__page',
                  { 'selected-page': pageNumber === currentPage },
                )}
                type="button"
                aria-label="buttonPage"
                id={`${pageNumber}`}
                onClick={handlePageClick}
              >
                {pageNumber}
              </button>
            </li>
          )
        );
      })}

      <li className="pagination__button-next pagination__button--mobile">
        <button
          data-cy="paginationRight"
          type="button"
          className="
            pagination-button
            pagination__button
          "
          aria-label="buttonNext"
          disabled={currentPage === lastPage}
          onClick={handleNextClick}
        />
      </li>
    </ul>
  );
};
