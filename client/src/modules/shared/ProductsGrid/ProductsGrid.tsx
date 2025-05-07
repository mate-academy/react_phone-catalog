import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Dropdown } from '../Dropdown';
import { getSearchWith } from '../../../utils/search';
import { getPages } from '../../../utils/helpers/helpers';

interface Props {
  products: Product[];
  title: string;
  isFavoritesPage?: boolean;
}

export const ProductsGrid: React.FC<Props> = ({
  products,
  title,
  isFavoritesPage,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('per-page') || '8';
  const page = searchParams.get('page') || '1';

  const maxPages = Math.ceil(products?.length / +perPage) || 1; // because of the "all" option

  const getSorted = () => {
    return [...products].sort((first, second) => {
      switch (sort) {
        case 'Newest':
          return second.year - first.year;
        case 'Oldest':
          return first.year - second.year;

        case 'Expensive':
          return second.priceDiscount - first.priceDiscount;

        case 'Cheap':
          return first.priceDiscount - second.priceDiscount;

        default:
          return 0;
      }
    });
  };

  const getPaginated = (arr: Product[]) => {
    if (+perPage) {
      const start = (+page - 1) * +perPage;
      const end = Math.min(+page * +perPage, arr.length);

      return arr.slice(start, end);
    }

    return arr;
  };

  const sorted = useMemo(() => {
    return getPaginated(getSorted());
  }, [products, sort, page, perPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const disableArrows = (way: 'right' | 'left') => {
    return cn(`arrow arrow--${way}`, {
      'arrow-disabled': way === 'right' ? +page === maxPages : +page === 1,
    });
  };

  return (
    <section className="products">
      <div className="products__path">
        <Link to="/" className="products__home home-icon" />

        <div className="products__arrow" />

        <p className="products__current-page">{title}</p>
      </div>

      <h2 className="products__title">
        {title === 'Phones' ? 'Mobile phones' : title}
      </h2>

      <p className="products__models-count">
        {products?.length === 1 ? '1 model' : `${products?.length} models`}
      </p>

      {!products?.length && (
        <div className="empty-page">
          <article className="empty-page__card">
            <h3 className="empty-page__title">
              Looks like nothing caught your eye yet
            </h3>

            <Link to="/" className="empty-page__button">
              Keep on looking
            </Link>
          </article>

          <div className="empty-page__img-grid">
            <div className="empty-page__img empty-page__img--favorites" />
          </div>
        </div>
      )}

      {!isFavoritesPage && (
        <div className="products__dropdowns">
          <Dropdown
            options={['Newest', 'Oldest', 'Expensive', 'Cheap']}
            title="Sort by"
            searchValue="sort"
            isLong
          />

          <Dropdown
            options={['8', '16', '24', 'All']}
            title="Items on page"
            searchValue="per-page"
          />
        </div>
      )}

      <article className="products__products">
        {sorted.map(product => (
          <ProductCard key={product.id} product={product} hasHotPrice />
        ))}
      </article>

      {!isFavoritesPage && maxPages !== 1 && (
        <div className="pagination">
          <Link
            className={disableArrows('left')}
            to={{
              search: getSearchWith(searchParams, {
                page: +page === 1 ? '1' : (+page - 1).toString(),
              }),
            }}
          />

          <div className="pagination__pages">
            {getPages(maxPages).map(onePage => (
              <Link
                className={cn('pagination__page', {
                  'page-selected': onePage === +page,
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    page: onePage.toString(),
                  }),
                }}
                key={onePage}
              >
                {onePage}
              </Link>
            ))}
          </div>

          <Link
            className={disableArrows('right')}
            to={{
              search: getSearchWith(searchParams, {
                page:
                  +page === maxPages
                    ? maxPages.toString()
                    : (+page + 1).toString(),
              }),
            }}
          />
        </div>
      )}
    </section>
  );
};
