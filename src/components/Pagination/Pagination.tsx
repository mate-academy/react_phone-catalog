import classNames from 'classnames';
import './Pagination.scss';
import { getNumbers } from '../../helpers/getNumbers';

type Props = {
  currentPage: number;
  countPages: number;
  handlePageParams: (value: number | null) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage, countPages, handlePageParams,
}) => {
  const numberPages = getNumbers(1, countPages);

  const handleNextClick = () => {
    handlePageParams(currentPage + 1);
  };

  const handlePrevClick = () => {
    handlePageParams(currentPage - 1);
  };

  return (
    <div className="Pagination" data-cy="pagination">
      <button
        type="button"
        data-cy="paginationLeft"
        className="
          arrowButton
          button
          arrowButton--left
        "
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      >
        &nbsp;
      </button>
      <div className="Pagination__pages">
        {numberPages.map(number => (
          <button
            type="button"
            className={classNames(
              'button',
              'arrowButton',
              'Pagination__button',
              { 'button--active': number === currentPage },
            )}
            key={number}
            onClick={() => handlePageParams(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        type="button"
        data-cy="paginationRight"
        className="
          arrowButton
          button
          arrowButton--right
        "
        disabled={currentPage === countPages}
        onClick={handleNextClick}
      >
        &nbsp;
      </button>
    </div>
  );
};
