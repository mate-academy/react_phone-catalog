import classNames from 'classnames';
import './Pagination.scss';

interface PaginationTypes {
  total: number,
  perPage: number | string,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<PaginationTypes> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / +perPage);

  const getNumbers = (from: number, to: number): number[] => {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  return (
    <ul
      className="Pagination"
      data-cy="pagination"
    >
      <li
        className={classNames('page__item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="paginationLeft"
          className={classNames('page__link', {
            disabled: currentPage === 1,
          })}
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <img src="img/ArrowLeft.png" alt="left" />
        </a>
      </li>

      <div className="page__list">
        {getNumbers(1, pagesAmount).map(page => (
          <li
            className={classNames(
              'page__item',
              { active: page === currentPage },
            )}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page__link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </div>

      <li
        className={classNames('page__item', {
          disabled: currentPage === pagesAmount,
        })}
      >
        <a
          data-cy="paginationRight"
          className={classNames('page__link', {
            disabled: currentPage === pagesAmount,
          })}
          href="#next"
          aria-disabled={currentPage === pagesAmount ? 'true' : 'false'}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <img src="img/ArrowRight.png" alt="right" />
        </a>
      </li>
    </ul>
  );
};
