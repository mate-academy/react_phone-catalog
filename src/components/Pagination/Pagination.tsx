import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../helpers/getNumbers';
import { getSearchWith } from '../../helpers/searchHelper';
import { goTop } from '../../helpers/goTop';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const maxPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === maxPage;

  const pageToRender = getNumbers(1, maxPage);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page > maxPage || page < 1) {
      return;
    }

    const newSearchParam = getSearchWith(searchParams, {
      page: page.toString() || null,
    });

    setSearchParams(newSearchParam);

    goTop();
  };

  return (
    <div className="pagination" data-cy="pagination">
      <button
        data-cy="paginationLeft"
        aria-label="prev"
        type="button"
        className={classNames('button-move', {
          'button-move--disabled': isFirstPage,
        })}
        disabled={isFirstPage}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <div
          className={classNames('icon', 'icon-prev', {
            'icon-prev-disabled': isFirstPage,
          })}
        />
      </button>

      <div className="pagination__numbers">
        {pageToRender.map(num => (
          <button
            key={num}
            aria-label="prev"
            type="button"
            className={classNames('pagination__button', {
              'pagination__button--is-active': currentPage === num,
            })}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        aria-label="next"
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        className={classNames('button-move', {
          'button-move--disabled': isLastPage,
        })}
        disabled={isLastPage}
        data-cy="paginationRight"
      >
        <div
          className={classNames('icon', 'icon-next', {
            'icon-next-inactive': isLastPage,
          })}
        />
      </button>
    </div>
  );
};
