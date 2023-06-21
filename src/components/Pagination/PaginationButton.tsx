import classNames from 'classnames';

type PaginationButtonProps = {
  onPageChange: (value: number) => void;
  currentPage: number;
  pageNumber: number;
};

export const PaginationButton = ({
  onPageChange,
  currentPage,
  pageNumber,
}: PaginationButtonProps) => (
  <button
    type="button"
    className={classNames('pagination__button', 'pagination__button--color', {
      'pagination__button--active': pageNumber === currentPage,
    })}
    onClick={() => onPageChange(pageNumber)}
  >
    {pageNumber}
  </button>
);
