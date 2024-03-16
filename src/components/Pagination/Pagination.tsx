import classNames from "classnames";
import "./Pagination.scss";
// import { useSearchParams } from "react-router-dom";

interface PaginationTypes {
  total: number;
  perPage: number | string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationTypes> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const pagesAmount = Math.ceil(total / +perPage);

  const getNumbers = (from: number, to: number): number[] => {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  return (
    <ul data-cy="pagination" className="Pagination">
      <li
        className={classNames("page__item", {
          disabled: currentPage === 1,
        })}
      >
        <button
          type="button"
          data-cy="paginationLeft"
          className={classNames("page__link", {
            disabled: currentPage === 1,
          })}
          aria-disabled={currentPage === 1 ? "true" : "false"}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <img src="./img/ArrowLeft.png" alt="left" />
        </button>
      </li>

      <div className="page__list">
        {getNumbers(1, pagesAmount).map((page) => (
          <li
            // className={classNames("page__item", {
            //   active: page === currentPage,
            // })}
            className="page__item"
            key={page}
          >
            <button
              type="button"
              data-cy="pageLink"
              className={classNames("page__link", {
                active: page === currentPage,
              })}
              // className="page__link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </div>

      <li
        className={classNames("page__item", {
          disabled: currentPage === pagesAmount,
        })}
      >
        <button
          type="button"
          data-cy="paginationRight"
          className={classNames("page__link", {
            disabled: currentPage === pagesAmount,
          })}
          aria-disabled={currentPage === pagesAmount ? "true" : "false"}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <img src="./img/ArrowRight.png" alt="right" />
        </button>
      </li>
    </ul>
  );
};
