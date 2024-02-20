import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { backToTop } from '../../utils/constants';
import { usePagination } from '../../hooks/usePagination';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Pagination.scss';

type Props = {
  countOfPages: number;
};

export const Pagination: React.FC<Props> = ({ countOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);

  const arrayOfPages = usePagination(countOfPages, 1, currentPage) || [];

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleClickNext = () => {
    setSearchWith({ page: currentPage + 1 });
    backToTop();
  };

  const handleClickPrev = () => {
    setSearchWith({ page: currentPage - 1 });
    backToTop();
  };

  return (
    <div className="pagination" data-cy="pagination">
      <div className="pagination__content">
        <button
          data-cy="paginationLeft"
          type="button"
          className={classNames('button button__arrow button__arrow--prev', {
            'button--disabled': currentPage === 1,
          })}
          onClick={handleClickPrev}
          disabled={currentPage === 1}
        >
          prev
        </button>

        <ul className="pagination__list">
          {arrayOfPages.map((num) => {
            if (typeof (num) === 'string') {
              return (
                <li className="pagination__item-dots" key={num}>
                  ...
                </li>
              );
            }

            return (
              <Link
                to={{
                  search: getSearchWith({ page: num }, searchParams),
                }}
                className={classNames('pagination__item', {
                  'pagination__item--is-active': currentPage === num,
                })}
                key={num}
                onClick={backToTop}
              >
                <li className={classNames('pagination__link', {
                  'pagination__link--is-active': currentPage === num,
                })}
                >
                  {num}
                </li>
              </Link>
            );
          })}
        </ul>

        <button
          data-cy="paginationRight"
          type="button"
          className={classNames('button button__arrow button__arrow--next', {
            'button--disabled': currentPage === countOfPages,
          })}
          onClick={handleClickNext}
          disabled={currentPage === countOfPages}
        >
          next
        </button>
      </div>
    </div>
  );
};
