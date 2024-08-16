/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Dropdown } from '../Dropdown';
import { getSearchWith } from '../../utils/search';
import { getPages } from '../../utils/helpers/helpers';

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
  const [searchText, setSearchText] = useState('');
  const [searchParams] = useSearchParams();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [products]);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [],
  );

  const sort = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('per-page') || '8';
  const page = searchParams.get('page') || '1';

  const maxPages = Math.ceil(products?.length / +perPage) || 1;

  const getSorted = useCallback(() => {
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
  }, [products, sort]);

  const getPaginated = useCallback(
    (arr: Product[]) => {
      if (+perPage) {
        const start = (+page - 1) * +perPage;
        const end = Math.min(+page * +perPage, arr.length);

        return arr.slice(start, end);
      }

      return arr;
    },
    [page, perPage],
  );

  const sorted = useMemo(() => {
    const filteredProducts =
      searchText.trim() === ''
        ? products
        : products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase()),
          );

    const sortedProducts = getSorted().filter(product =>
      filteredProducts.includes(product),
    );

    return getPaginated(sortedProducts);
  }, [getPaginated, getSorted, products, searchText]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    setSearchText('');
  }, [searchParams.get('page')]);

  const disableArrows = (way: 'right' | 'left') => {
    return cn(`arrow arrow--${way}`, {
      'arrow-disabled': way === 'right' ? +page === maxPages : +page === 1,
    });
  };

  return (
    <section ref={scrollRef} className="products">
      {!products.length ? null : (
        <div className="products__path">
          <Link to="/" className="products__home home-icon" />
          <div className="products__arrow" />
          <p className="products__current-page">{title}</p>
        </div>
      )}

      {products.length > 0 && (
        <>
          <h2 className="products__title">
            {title === 'Phones' ? 'Mobile phones' : title}
          </h2>

          <p className="products__models-count">
            {products.length === 1 ? '1 model' : `${products.length} models`}
          </p>
        </>
      )}

      {!products.length && (
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

      {products.length > 0 && !isFavoritesPage && (
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

          <div className="products__search">
            <p className="products__search__search-name">Find item</p>
            <input
              type="text"
              className="products__search-input"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      )}

      {products.length > 0 && (
        <article className="products__products">
          {sorted.map(product => (
            <ProductCard key={product.id} product={product} hasHotPrice />
          ))}
        </article>
      )}

      {products.length > 0 && !isFavoritesPage && maxPages !== 1 && (
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
