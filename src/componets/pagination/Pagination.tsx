import './Pagination.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentPage } from '../../redux/reducers/paginationReducer';
import PreviousGroupIcon from '../SliderIconPrevious/PreviousGroupIcon';
import NextGroupIcon from '../sliderIconNext/NextGroupIcon';

type PaginationProps = {
  length: number;
};

export const Pagination: React.FC<PaginationProps> = ({ length }) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(state => state.pagination.currentPage);
  const totalPages = useAppSelector(
    state => Math.ceil(
      length / state.pagination.productsPerPage,
    ),
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pageNumbers.push(i);
      }
    } else if (currentPage === 1 || currentPage === 2) {
      for (let i = 1; i <= 5; i += 1) {
        pageNumbers.push(i);
      }
    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
      for (let i = Math.max(totalPages - 4, 1); i <= totalPages; i += 1) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination" data-cy="pagination">
      <button
        type="button"
        className="pagination__button"
        data-cy="paginationLeft"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <PreviousGroupIcon disabled={currentPage === 1} />
      </button>
      {getPageNumbers().map((page) => (
        <button
          type="button"
          className={classNames(
            'pagination__button',
            { 'pagination__button-active': currentPage === page },
          )}
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="pagination__button"
        data-cy="paginationRight"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <NextGroupIcon disabled={currentPage === totalPages} />
      </button>
    </div>
  );
};
