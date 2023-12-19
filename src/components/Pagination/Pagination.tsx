import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPages } from '../../helpers/paginationFunc';
import { getSearchWith } from '../../helpers/searchHelpers';
import { TechProductsContext } from '../../stores/TechProductsContext';
import { TechProduct } from '../../types/TechProduct';
import './Pagination.scss';
import { moveToUp } from '../../helpers/movePageToUp';

type Props = {
  visibleProducts: TechProduct[],
};

export const Pagination: React.FC<Props> = ({
  visibleProducts,
}) => {
  const {
    page,
    perPage,
    setSearchWith,
  } = useContext(TechProductsContext);

  const handlePrevPage = () => {
    setSearchWith({ page: +page - 1 || null });
    moveToUp();
  };

  const handlePage = () => {
    moveToUp();
  };

  const handleNextPage = () => {
    setSearchWith({ page: +page + 1 || null });
    moveToUp();
  };

  const pages = getPages(1, Math.ceil(visibleProducts.length / +perPage));
  const [searchParams] = useSearchParams();

  return (
    <div
      data-cy="pagination"
      className="pagination"
    >
      <ul className="pagination__pagination-list">
        <li className="pagination__pagination-item">
          <button
            type="button"
            data-cy="paginationLeft"
            className="pagination__pagination-button"
            onClick={handlePrevPage}
            disabled={+page <= 1}
          >
            <div className="icon icon--arrow-left" />
          </button>
        </li>

        {
          pages.map((Page) => (
            <li key={Page} className="pagination__pagination-item">
              <Link
                to={
                  {
                    search: getSearchWith(
                      searchParams,
                      { page: Page.toString() || null },
                    ),
                  }
                }
                onClick={handlePage}
                className={
                  classNames(
                    'pagination__pagination-link',
                    {
                      // eslint-disable-next-line
                      'pagination__pagination-link pagination__pagination-link--active':
                      page === Page.toString(),
                    },
                  )
                }
              >
                {Page}
              </Link>
            </li>
          ))
        }

        <li className="pagination__pagination-item">
          <button
            type="button"
            data-cy="paginationRight"
            className="pagination__pagination-button"
            onClick={handleNextPage}
            disabled={+page >= pages.length}
          >
            <div className="icon icon--arrow-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};
