import classNames from 'classnames';
import { IconButton } from '../../bits';
import { IconButtonType } from '../../types';
import './Pagination.scss';

type Props = {
  phonesPerPage: number,
  totalPhones: number,
  setCurrentPage: (page: number) => void,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  phonesPerPage,
  totalPhones,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPhones / phonesPerPage);
  const pagesToShow = 5;
  const middlePage = Math.ceil(pagesToShow / 2);

  let startPage = currentPage - middlePage + 1;
  let endPage = currentPage + middlePage;

  if (startPage < 1) {
    startPage = 1;
    endPage = pagesToShow;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - pagesToShow + 1;
  }

  if (startPage < 1) {
    startPage = 1;
  }

  const visiblePages = [];

  for (let number = startPage; number <= endPage; number += 1) {
    visiblePages.push(number);
  }

  const handlePageSet = (page: number) => () => {
    setCurrentPage(page);
  };

  const pageBack = () => {
    if (currentPage === 1) {
      return;
    }

    const newValue = currentPage - 1;

    setCurrentPage(newValue);
  };

  const pageNext = () => {
    if (currentPage === totalPages) {
      return;
    }

    const newValue = currentPage + 1;

    setCurrentPage(newValue);
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <IconButton
        data-cy="paginationLeft"
        type={IconButtonType.arrowBack}
        handler={pageBack}
      />

      <div className="pagination__pages">
        {visiblePages.map(number => (
          <button
            key={number}
            type="button"
            className={classNames('pagination__btn', {
              'pagination__btn--selected': number === currentPage,
            })}
            onClick={handlePageSet(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <IconButton
        type={IconButtonType.arrowNext}
        handler={pageNext}
        data-cy="paginationRight"
      />
    </div>
  );
};
