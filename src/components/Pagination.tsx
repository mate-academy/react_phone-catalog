import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/getSearchWith';

type Props = {
  total: number[],
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();
  const start = 1;
  const end = total[total.length - 1];

  const searchPath = (num: number) => {
    return {
      search: getSearchWith(searchParams, { page: `${num}` }),
    };
  };

  const stepFwd = () => {
    return {
      search: getSearchWith(searchParams, { page: `${currentPage + 1}` }),
    };
  };

  const stepBck = () => {
    return {
      search: getSearchWith(searchParams, { page: `${currentPage - 1}` }),
    };
  };

  return (
    <div className="phones-page__pages" data-cy="pagination">
      <Link
        data-cy="paginationLeft"
        className={classNames(
          'slider-button__left',
          { 'slider-button__left--disabled': currentPage === start },
        )}
        to={stepBck()}
      />
      <ul className="pagination-block">
        {total.map((num: number) => (
          <li key={num}>
            <Link
              to={searchPath(num)}
              className={
                classNames(
                  'pagination-block__item',
                  { 'page-is-active': currentPage === num },
                )
              }
            >
              {num}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        data-cy="paginationRight"
        className={classNames(
          'slider-button__right',
          { 'slider-button__right--disabled': currentPage === end },
        )}
        to={stepFwd()}
      />
    </div>
  );
};
