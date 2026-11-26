import { useMemo } from 'react';
import type { ProductCategory } from '../../../shared/types/Product';
import type { SortKey, PerPageValue } from '../../hooks/useProducts';
import styles from './ProductsHeader.module.scss';

interface ProductsHeaderProps {
  category: ProductCategory;
  totalCount: number;
  sort: SortKey;
  perPage: PerPageValue;
  query: string;
  onSortChange: (value: SortKey) => void;
  onPerPageChange: (value: PerPageValue) => void;
  onQueryChange: (value: string) => void;
}

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export function ProductsHeader({
  category,
  totalCount,
  sort,
  perPage,
  query,
  onSortChange,
  onPerPageChange,
  onQueryChange,
}: ProductsHeaderProps): JSX.Element {
  const categoryLabel = CATEGORY_LABELS[category];
  const pageTitle = `${categoryLabel} page`;

  const sortOptions = useMemo(
    () => [
      { value: 'age', label: 'Newest' },
      { value: 'title', label: 'Alphabetically' },
      { value: 'price', label: 'Cheapest' },
    ],
    [],
  );

  const perPageOptions = useMemo(
    () => [
      { value: '4', label: '4' },
      { value: '8', label: '8' },
      { value: '16', label: '16' },
      { value: 'all', label: 'All' },
    ],
    [],
  );

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <p className={styles.count}>
          {totalCount} model{totalCount !== 1 ? 's' : ''}
        </p>
      </div>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="sort-select"
              className={styles.select}
              value={sort}
              onChange={e => onSortChange(e.target.value as SortKey)}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className={styles.chevron}
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div className={styles.controlGroup}>
          <label htmlFor="perpage-select" className={styles.label}>
            Items on page
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="perpage-select"
              className={styles.select}
              value={perPage}
              onChange={e => onPerPageChange(e.target.value as PerPageValue)}
            >
              {perPageOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className={styles.chevron}
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.searchWrapper}>
        <label htmlFor="search-input" className={styles.searchLabel}>
          Search
        </label>
        <input
          id="search-input"
          type="search"
          className={styles.searchInput}
          placeholder={`Search ${categoryLabel.toLowerCase()}...`}
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </header>
  );
}
