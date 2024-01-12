/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
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

  const [searchParams] = useSearchParams();

  const handlePrevPage = () => {
    moveToUp();
    setSearchWith({ page: +page - 1 || null });
  };

  const handlePage = (Page: number) => {
    return (
      {
        search: getSearchWith(
          searchParams,
          { page: Page.toString() || null },
        ),
      }
    );
  };

  const handleNextPage = () => {
    moveToUp();
    setSearchWith({ page: +page + 1 || null });
  };

  const pages = getPages(1, Math.ceil(visibleProducts.length / +perPage));

  // eslint-disable-next-line
  const cutPages = (pages.length > 12 && page === pages[0].toString())
    ? pages.slice(+page - 1, +page + 2)
    // eslint-disable-next-line
    : (pages.length > 12)
      ? ((page === pages[pages.length - 1].toString())
        ? pages.slice(+page - 3)
        : pages.slice(+page - 2, +page + 1)) : pages;

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
            className={
              +page <= 1
                ? 'pagination__disabled-pagination-button'
                : 'pagination__pagination-button'
            }
            onClick={handlePrevPage}
            disabled={+page <= 1}
          >
            <div
              className={
                +page <= 1
                  ? 'icon icon--arrow-left-disabled'
                  : 'icon icon--arrow-left'
              }
            />
          </button>
        </li>

        {
          cutPages.map((Page) => (
            <li key={Page} className="pagination__pagination-item">
              <Link
                to={handlePage(Page)}
                onClick={moveToUp}
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
            className={
              +page >= pages.length
                ? 'pagination__disabled-pagination-button'
                : 'pagination__pagination-button'
            }
            onClick={handleNextPage}
            disabled={+page >= pages.length}
          >
            <div
              className={
                +page >= pages.length
                  ? 'icon icon--arrow-right-disabled'
                  : 'icon icon--arrow-right'
              }
            />
          </button>
        </li>
      </ul>
    </div>
  );
};
