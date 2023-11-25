import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import './Pagination.scss';
import Arrow_left from '../../icons/Arrow_left.svg';
import Arrow_right from '../../icons/Arrow_right.svg';
import { getSearchWith } from '../../helpers/getSearch';

type Props = {
  page: number,
  pages: number[],
};

const Pagination:React.FC<Props> = ({ page, pages }) => {
  const [searchParams] = useSearchParams('');

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__item">
        <Link
          to={{
            search: getSearchWith({
              page: (page - 1).toString(),
            }, searchParams),
          }}
          className={classNames('pagination__link', {
            'pagination__link--disabled': page === 1,
          })}
          data-cy="paginationLeft"
        >
          <img src={Arrow_left} alt="" />
        </Link>
      </li>
      {pages.map(pageNumber => (
        <li
          className="pagination__item"
          key={pageNumber}
        >
          <Link
            to={{
              search: getSearchWith({
                page: pageNumber.toString(),
              }, searchParams),
            }}
            className={classNames('pagination__link', {
              'pagination__link--active': page === pageNumber,
            })}
          >
            {pageNumber}
          </Link>
        </li>
      ))}
      <li className="pagination__item">
        <Link
          to={{
            search: getSearchWith({
              page: (page + 1).toString(),
            }, searchParams),
          }}
          className={classNames('pagination__link', {
            'pagination__link--disabled': page === pages.length,
          })}
          data-cy="paginationRight"
        >
          <img src={Arrow_right} alt="" />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
