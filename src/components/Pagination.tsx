import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  totalProducts: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: React.FC<Props> = ({
  totalProducts,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();

  const pageCount = getNumbers(1, Math.ceil(totalProducts / perPage));

  function handleParamChange(value: number) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', value.toString());

    return newParams.toString();
  }

  return (
    <ul className="pagination" data-cy="pagination">
      <li>
        <Link
          className={classNames(
            'pagination__link pagination__link--left',
            { 'pagination__link--disabled': currentPage === 1 },
          )}
          to={{ search: handleParamChange(currentPage - 1) }}
          onClick={() => onPageChange(currentPage - 1)}
        />
      </li>

      {pageCount.map(item => (
        <li key={item}>
          <Link
            className={classNames(
              'pagination__link',
              { 'pagination__link--active': currentPage === item },
            )}
            to={{ search: handleParamChange(item) }}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Link>
        </li>
      ))}

      <li>
        <Link
          className={classNames(
            'pagination__link pagination__link--right',
            { 'pagination__link--disabled': currentPage === pageCount.length },
          )}
          to={{ search: handleParamChange(currentPage + 1) }}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </li>
    </ul>
  );
};
