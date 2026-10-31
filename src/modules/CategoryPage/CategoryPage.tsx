import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useProducts } from '../../hooks/useProducts';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Ui/Dropdown';

import type { Product } from '../../types/Product';

import styles from './CategoryPage.module.scss';

const cx = classNames.bind(styles);

type Props = {
  category: string;
  title: string;
};

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

export const CategoryPage = ({ category, title }: Props) => {
  const { products, isLoading, error } = useProducts(category);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');

  const sortKey: SortKey = SORT_OPTIONS.some(option => option.key === sortParam)
    ? (sortParam as SortKey)
    : DEFAULT_SORT;

  const perPageParam = searchParams.get('perPage');

  const perPageKey = PER_PAGE_OPTIONS.some(
    option => option.key === perPageParam,
  )
    ? perPageParam!
    : DEFAULT_PER_PAGE;

  const sortedProducts = useMemo(
    () => [...products].sort(SORT_COMPARATORS[sortKey]),
    [products, sortKey],
  );

  const updateParam = (
    name: 'sort' | 'perPage',
    value: string,
    defaultValue: string,
  ) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value === defaultValue) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      params.delete('page');

      return params;
    });
  };

  const handleSortChange = (label: string | null) => {
    const option = SORT_OPTIONS.find(sortOption => sortOption.label === label);

    if (option) {
      updateParam('sort', option.key, DEFAULT_SORT);
    }
  };

  const handlePerPageChange = (label: string | null) => {
    const option = PER_PAGE_OPTIONS.find(
      pageOption => pageOption.label === label,
    );

    if (option) {
      updateParam('perPage', option.key, DEFAULT_PER_PAGE);
    }
  };

  const sortLabel =
    SORT_OPTIONS.find(option => option.key === sortKey)?.label ?? null;

  const perPageLabel =
    PER_PAGE_OPTIONS.find(option => option.key === perPageKey)?.label ?? null;

  return (
    <main className={cx('category-page')}>
      <Breadcrumbs items={[{ label: title }]} />

      <div className={cx('category-page__header')}>
        <h1 className={cx('category-page__title')}>{title}</h1>

        <p className={cx('category-page__products-count')}>
          {products.length} models
        </p>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <>
          <div className={cx('category-page__dropdowns')}>
            <div className={cx('category-page__sort-by')}>
              <Dropdown
                label="Sort by"
                options={SORT_OPTIONS.map(option => option.label)}
                value={sortLabel}
                onChange={handleSortChange}
                placeholder="Newest"
              />
            </div>

            <div className={cx('category-page__items-on-page')}>
              <Dropdown
                label="Items on page"
                options={PER_PAGE_OPTIONS.map(option => option.label)}
                value={perPageLabel}
                onChange={handlePerPageChange}
                placeholder="16"
              />
            </div>
          </div>

          <ProductList products={sortedProducts} perPage={Number(perPageKey)} />
        </>
      )}
    </main>
  );
};
