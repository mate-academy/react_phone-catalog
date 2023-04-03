import cn from 'classnames';
import './style.scss';
import { getPaginationNumbers } from '../../helpers/calc/helper';
import { Product } from '../../types/Product';
import { ProductsList } from '../ProductsList';
import { SearchLink } from '../SearchLink/SearchLink';

type PaginationProps = {
  products: Product[];
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  products,
  perPage,
  currentPage,
}) => {
  const startOfItems = (currentPage - 1) * perPage;
  const endOfItems = currentPage * perPage;
  const maxNumberOfPages = Math.ceil(products.length / perPage);
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === maxNumberOfPages;

  const visibleItems = products.slice(startOfItems, endOfItems);
  const pageItems = getPaginationNumbers(1, maxNumberOfPages);

  const isPaginationBtnsVisible = products.length > perPage;
  const nextPage = isPageFirst ? currentPage : currentPage - 1;
  const prevPage = isPageLast ? currentPage : currentPage + 1;

  return (
    <>
      <div data-cy="pagination" className="pagination">
        <div className="pagination__content">
          <ProductsList products={visibleItems} />
        </div>

        {isPaginationBtnsVisible && (
          <ul className="pagination__buttons">
            <li
              className={cn('page-item', {
                disabled: isPageFirst,
              })}
            >
              <SearchLink
                data-cy="paginationLeft"
                className={cn('pagination__slide-btn', 'icon__btn', {
                  'pagination__slide-btn--disabled': isPageFirst,
                })}
                type="button"
                params={{ page: `${nextPage}` }}
              >
                <i
                  className={cn('icon', 'icon--arrow-left', {
                    'icon--arrow-left--disabled': isPageFirst,
                  })}
                />
              </SearchLink>
            </li>
            {pageItems.map((pageItem) => {
              return (
                <li key={pageItem}>
                  <SearchLink
                    className={cn('pagination__page-btn', 'icon__btn', {
                      'pagination__page-btn-selected': pageItem === currentPage,
                    })}
                    params={{ page: `${pageItem}` }}
                  >
                    {pageItem}
                  </SearchLink>
                </li>
              );
            })}
            <li
              className={cn('page-item', {
                disabled: isPageLast,
              })}
            >
              <SearchLink
                data-cy="paginationRight"
                className={cn('pagination__slide-btn', 'icon__btn', {
                  'pagination__slide-btn--disabled': isPageLast,
                })}
                params={{ page: `${prevPage}` }}
              >
                <i
                  className={cn('icon', 'icon--arrow-right', {
                    'icon--arrow-right--disabled': isPageLast,
                  })}
                />
              </SearchLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
