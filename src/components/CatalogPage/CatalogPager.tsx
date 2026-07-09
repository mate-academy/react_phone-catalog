import { ProductPreview } from '../../types';
import { useFilters } from '../../hooks/useFilters';
import classNames from 'classnames';
import styles from './CatalogPager.module.scss';
import arrowLeft from '../../images/Icons/Arrow-Left.png';
import arrowRight from '../../images/Icons/Arrow-Right.png';
import { SearchLink } from '../SearchLink/SearchLink';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products/ProductsStore';
import { ProductsList } from '../ProductsList/ProductsList';

type Props = {
  products: ProductPreview[];
  category?: string;
};

export const CatalogPager: React.FC<Props> = ({ products, category }) => {
  const { items, page } = useFilters();
  const { loading, error } = useContext(ProductsContext);
  const totalProducts = products.length;

  const currentPage = Number(page) || 1;
  const perPage =
    items === 'all' ? products.length : Number(items || totalProducts);

  const totalPages = Array.from(
    { length: Math.max(1, Math.ceil(totalProducts / perPage)) },
    (_, i) => i + 1,
  );

  const safePage = Math.min(currentPage, Math.ceil(products.length / perPage));

  const start = (safePage - 1) * perPage;
  const end = start + perPage;

  const visibleProducts = products.slice(start, end);

  const totalPagesNumber = totalPages.length;

  let startPage = Math.max(1, safePage - Math.floor(4 / 2));

  let endPage = startPage + 4 - 1;

  if (endPage > totalPagesNumber) {
    endPage = totalPagesNumber;
    startPage = Math.max(1, endPage - 4 + 1);
  }

  const visiblePages = totalPages.slice(startPage - 1, endPage);

  return (
    <div className={styles.pager}>
      <ProductsList
        products={visibleProducts}
        error={error}
        loading={loading}
        category={category}
      />

      {items ? (
        <ul className={styles.pager__pagination}>
          <li
            className={classNames(styles.pager__paginationItem, {
              [styles.pager__paginationItemDisabled]: safePage === 1,
            })}
          >
            <SearchLink
              className={styles.pager__paginationLink}
              aria-disabled={safePage === 1}
              onClick={e => {
                if (safePage === 1) {
                  e.preventDefault();
                }
              }}
              params={
                safePage - 1 <= 1
                  ? { page: null }
                  : { page: String(safePage - 1) }
              }
            >
              <img src={arrowLeft} alt="Prev page" />
            </SearchLink>
          </li>
          <li className={styles.pager__paginationBullets}>
            <ul className={styles.pager__paginationBulletsList}>
              {visiblePages.map(pageNumber => (
                <li
                  key={pageNumber}
                  className={classNames(styles.pager__paginationBulletItem, {
                    [styles.pager__paginationBulletActive]:
                      pageNumber === safePage,
                  })}
                >
                  <SearchLink
                    className={styles.pager__paginationBulletLink}
                    params={
                      pageNumber === 1
                        ? { page: null }
                        : { page: String(pageNumber) }
                    }
                  >
                    {pageNumber}
                  </SearchLink>
                </li>
              ))}
            </ul>
          </li>
          <li
            className={classNames(styles.pager__paginationItem, {
              [styles.pager__paginationItemDisabled]:
                safePage === totalPages.length,
            })}
          >
            <SearchLink
              className={styles.pager__paginationLink}
              aria-disabled={safePage === totalPages.length}
              onClick={e => {
                if (safePage === totalPages.length) {
                  e.preventDefault();
                }
              }}
              params={{ page: String(safePage + 1) }}
            >
              <img src={arrowRight} alt="Next page" />
            </SearchLink>
          </li>
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};
