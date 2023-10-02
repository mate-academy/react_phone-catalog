import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import './Pagination.scss';

type Props = {
  paginationNumber: number;
  setPaginationNumber: (value: number) => void;
  numberOfPagination: number[];
};

const ActivePaginationButton = (paginationNumber: number, number: number) => cn(
  'pagination-button',
  { 'pagination-button--number': paginationNumber === number },
);

const LeftPaginationButton = (number: number) => cn(
  'pagination-button',
  { 'pagination-button--disabled': number === 1 },
);

const RightPaginationButton = (number: number, length: number[]) => cn(
  'pagination-button',
  { 'pagination-button--disabled': number === length.length },
);

export const PaginationComponent: React.FC<Props> = ({
  paginationNumber,
  setPaginationNumber,
  numberOfPagination,
}) => {
  return (
    <div
      className="pagination phones-page-container__pagination"
      data-cy="pagination"
    >
      <SearchLink
        params={{ page: String((paginationNumber - 1)) }}
        type="button"
        className={LeftPaginationButton(paginationNumber)}
        onClick={() => setPaginationNumber(paginationNumber - 1)}
        data-cy="paginationLeft"
      >
        <img
          className={paginationNumber !== 1 ? 'img' : ''}
          src="./img/icons/arrowleft.svg"
          alt="#right-pagination"
        />
      </SearchLink>
      <div className="pagination-numbers">
        {numberOfPagination.map(number => (
          <SearchLink
            params={{ page: String(number) }}
            key={number}
            type="button"
            className={ActivePaginationButton(paginationNumber, number)}
            onClick={() => setPaginationNumber(number)}
            data-cy="paginationRight"
          >
            {number}
          </SearchLink>
        ))}
      </div>

      <SearchLink
        params={{ page: String(paginationNumber + 1) }}
        type="button"
        className={
          RightPaginationButton(paginationNumber, numberOfPagination)
        }
        onClick={() => setPaginationNumber(paginationNumber + 1)}
      >
        <img
          className={paginationNumber !== numberOfPagination.length
            ? 'img' : ''}
          src="./img/icons/arrowright.svg"
          alt="#right-pagination"
        />
      </SearchLink>
    </div>
  );
};
