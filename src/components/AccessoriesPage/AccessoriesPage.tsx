import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { ProductCard } from '../ProductCard/ProductCard';

export const AccessoriesPage: React.FC = () => {
  const { products } = useProducts();

  const [sortOpen, setSortOpen] = useState(false);
  const [perPageOpen, setPerPageOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  const currentPageNumber = Number(page ?? 1);

  const accessories = React.useMemo(() => {
    return products.filter(p => p.category === 'accessories');
  }, [products]);

  const sortedAccessories = React.useMemo(() => {
    const items = [...accessories];

    switch (sort) {
      case 'Newest':
        return items.sort((a, b) => b.year - a.year);

      case 'Alphabetically':
        return items.sort((a, b) => a.name.localeCompare(b.name));

      case 'Cheapest':
        return items.sort((a, b) => a.price - b.price);

      default:
        return items;
    }
  }, [accessories, sort]);

  const perPageNumber =
    perPage === 'all' ? sortedAccessories.length : Number(perPage ?? 16);

  const start = (currentPageNumber - 1) * perPageNumber;
  const end = start + perPageNumber;

  const visibleProducts = sortedAccessories.slice(start, end);

  const totalPages = Math.ceil(sortedAccessories.length / perPageNumber);
  const maxVisiblePages = 5;

  const visiblePages = React.useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    let startT = Math.max(
      currentPageNumber - Math.floor(maxVisiblePages / 2),
      0,
    );
    let endT = startT + maxVisiblePages;

    if (endT > totalPages) {
      endT = totalPages;
      startT = totalPages - maxVisiblePages;
    }

    return Array.from({ length: endT - startT }, (_, i) => i + startT);
  }, [currentPageNumber, totalPages]);

  return (
    <main>
      <div className="elements">
        <div className="elements__wrapper">
          <Link to="/" className="icon icon--home"></Link>
          <div className="icon icon--right"></div>
          <div className="elements__nav-text small-text">Accessories</div>
        </div>

        <h1 className="elements__title">Accessories</h1>

        <div className="elements__quantity body-text">
          {`${sortedAccessories.length} models`}
        </div>

        <div className="dropdown__wrapper dropdown__wrapper--sort">
          <div className="dropdown" onClick={() => setSortOpen(prev => !prev)}>
            {sort || 'Sort'}
            <div
              className={classNames(
                'icon',
                sortOpen ? 'icon--up' : 'icon--down',
              )}
            />
          </div>

          {sortOpen && (
            <div className="dropdown__selection">
              <SearchLink
                params={{ sort: 'Newest' }}
                className="dropdown__option"
                onClick={() => setSortOpen(false)}
              >
                Newest
              </SearchLink>

              <SearchLink
                params={{ sort: 'Alphabetically' }}
                className="dropdown__option"
                onClick={() => setSortOpen(false)}
              >
                Alphabetically
              </SearchLink>

              <SearchLink
                params={{ sort: 'Cheapest' }}
                className="dropdown__option"
                onClick={() => setSortOpen(false)}
              >
                Cheapest
              </SearchLink>

              <SearchLink
                params={{ sort: null }}
                className="dropdown__option"
                onClick={() => setSortOpen(false)}
              >
                Default
              </SearchLink>
            </div>
          )}
        </div>

        <div className="dropdown__wrapper dropdown__wrapper--pages">
          <div
            className="dropdown"
            onClick={() => setPerPageOpen(prev => !prev)}
          >
            {perPage || '16'}
            <div
              className={classNames(
                'icon',
                perPageOpen ? 'icon--up' : 'icon--down',
              )}
            />
          </div>

          {perPageOpen && (
            <div className="dropdown__selection">
              <SearchLink
                params={{ perPage: '4' }}
                className="dropdown__option"
                onClick={() => setPerPageOpen(false)}
              >
                4
              </SearchLink>

              <SearchLink
                params={{ perPage: '8' }}
                className="dropdown__option"
                onClick={() => setPerPageOpen(false)}
              >
                8
              </SearchLink>

              <SearchLink
                params={{ perPage: null }}
                className="dropdown__option"
                onClick={() => setPerPageOpen(false)}
              >
                16
              </SearchLink>

              <SearchLink
                params={{ perPage: 'all' }}
                className="dropdown__option"
                onClick={() => setPerPageOpen(false)}
              >
                All
              </SearchLink>
            </div>
          )}
        </div>

        <div className="elements__products">
          {visibleProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              discounted={true}
              cn="product__card product__card--page"
            />
          ))}
        </div>

        {perPage !== 'all' && (
          <nav className="elements__pages">
            <div className="elements__pages-list">
              <SearchLink
                params={{
                  page: String(Math.max(currentPageNumber - 1, 1)),
                }}
                className="elements__pages-button button"
              >
                <div className="icon icon--left"></div>
              </SearchLink>

              {visiblePages.map(num => (
                <SearchLink
                  params={{ page: String(num + 1) }}
                  key={num}
                  className={classNames(
                    'elements__pages-button button',
                    currentPageNumber === num + 1 ? 'is-active' : '',
                  )}
                >
                  {num + 1}
                </SearchLink>
              ))}

              <SearchLink
                params={{
                  page: String(Math.min(currentPageNumber + 1, totalPages)),
                }}
                className="elements__pages-button button"
              >
                <div className="icon icon--right"></div>
              </SearchLink>
            </div>
          </nav>
        )}
      </div>
    </main>
  );
};
