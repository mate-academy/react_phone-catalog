import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import type { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Dropdown } from '../Ui/Dropdown';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

const MAX_PAGE_BUTTONS = 4;

type SortKey =
  | 'newest'
  | 'oldest'
  | 'price-asc'
  | 'price-desc'
  | 'discount'
  | 'name';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'discount', label: 'Biggest discount' },
  { key: 'name', label: 'Name: A to Z' },
];

const SORT_COMPARATORS: Record<SortKey, (a: Product, b: Product) => number> = {
  newest: (a, b) => b.year - a.year || b.id - a.id,
  oldest: (a, b) => a.year - b.year || a.id - b.id,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  discount: (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  name: (a, b) => a.name.localeCompare(b.name),
};

const PER_PAGE_OPTIONS = [
  { key: '4', label: '4' },
  { key: '8', label: '8' },
  { key: '16', label: '16' },
  { key: '32', label: '32' },
];

const DEFAULT_SORT: SortKey = 'newest';
const DEFAULT_PER_PAGE = '16';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- sort & per page from URL (with validation) ---
  const sortParam = searchParams.get('sort');
  const sortKey: SortKey = SORT_OPTIONS.some(o => o.key === sortParam)
    ? (sortParam as SortKey)
    : DEFAULT_SORT;

  const perPageParam = searchParams.get('perPage');
  const perPageKey = PER_PAGE_OPTIONS.some(o => o.key === perPageParam)
    ? (perPageParam as string)
    : DEFAULT_PER_PAGE;

  const sortedProducts = useMemo(
    () => [...products].sort(SORT_COMPARATORS[sortKey]),
    [products, sortKey],
  );

  const itemsPerPage =
    perPageKey === 'all'
      ? Math.max(sortedProducts.length, 1)
      : Number(perPageKey);

  // --- pagination ---
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage),
  );

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const page = Math.min(Math.max(pageFromUrl, 1), totalPages);

  const start = (page - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(start, start + itemsPerPage);

  const firstButton = Math.min(
    Math.max(page - 1, 1),
    Math.max(totalPages - MAX_PAGE_BUTTONS + 1, 1),
  );
  const lastButton = Math.min(firstButton + MAX_PAGE_BUTTONS - 1, totalPages);
  const pages = Array.from(
    { length: lastButton - firstButton + 1 },
    (_, i) => firstButton + i,
  );

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (safePage === 1) {
        params.delete('page');
      } else {
        params.set('page', String(safePage));
      }

      return params;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Зміна сортування/кількості скидає сторінку на першу
  const updateParam = (
    name: 'sort' | 'perPage',
    value: string,
    def: string,
  ) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value === def) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      params.delete('page');

      return params;
    });
  };

  const handleSortChange = (label: string | null) => {
    const option = SORT_OPTIONS.find(o => o.label === label);

    if (option) {
      updateParam('sort', option.key, DEFAULT_SORT);
    }
  };

  const handlePerPageChange = (label: string | null) => {
    const option = PER_PAGE_OPTIONS.find(o => o.label === label);

    if (option) {
      updateParam('perPage', option.key, DEFAULT_PER_PAGE);
    }
  };

  const sortLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? null;
  const perPageLabel =
    PER_PAGE_OPTIONS.find(o => o.key === perPageKey)?.label ?? null;

  return (
    <div className={cx('product-list')}>
      <div className={cx('product-list__dropdowns')}>
        <div className={cx('product-list__sort-by')}>
          <Dropdown
            label="Sort by"
            options={SORT_OPTIONS.map(o => o.label)}
            value={sortLabel}
            onChange={handleSortChange}
            placeholder="Newest"
          />
        </div>
        <div className={cx('product-list__items-on-page')}>
          <Dropdown
            label="Items on page"
            options={PER_PAGE_OPTIONS.map(o => o.label)}
            value={perPageLabel}
            onChange={handlePerPageChange}
            placeholder="16"
          />
        </div>
      </div>

      <div className={cx('product-list__grid')}>
        {visibleProducts.map(product => (
          <div key={product.id} className={cx('product-list__item')}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className={cx('product-list__pagination')} aria-label="Pagination">
          <button
            type="button"
            className={cx('product-list__page-button')}
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {pages.map(p => (
            <button
              key={p}
              type="button"
              className={cx('product-list__page-button', {
                'product-list__page-button--active': p === page,
              })}
              onClick={() => goToPage(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            className={cx('product-list__page-button')}
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
};
