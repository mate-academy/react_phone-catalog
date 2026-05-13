import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category, Product } from '../../types/Product';
import { useProducts } from '../../context/ProductsContext';
import { useT } from '../../context/LanguageContext';
import { TranslationKey } from '../../i18n/translations';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './ProductsPage.module.scss';

interface Props {
  category: Category;
}

type SortKey = 'newest' | 'alphabetical' | 'cheapest';

const TITLE_KEYS: Record<
  Category,
  { titleKey: TranslationKey; crumbKey: TranslationKey }
> = {
  phones: { titleKey: 'category.phones', crumbKey: 'nav.phones' },
  tablets: { titleKey: 'category.tablets', crumbKey: 'nav.tablets' },
  accessories: {
    titleKey: 'category.accessories',
    crumbKey: 'nav.accessories',
  },
};

const SORTS: { value: SortKey; labelKey: TranslationKey }[] = [
  { value: 'newest', labelKey: 'sort.newest' },
  { value: 'alphabetical', labelKey: 'sort.alphabetical' },
  { value: 'cheapest', labelKey: 'sort.cheapest' },
];

const PER_PAGES = ['4', '8', '16', 'all'] as const;

const sortProducts = (items: Product[], key: SortKey): Product[] => {
  const copy = [...items];
  switch (key) {
    case 'newest':
      return copy.sort((a, b) => b.year - a.year || b.fullPrice - a.fullPrice);
    case 'alphabetical':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return copy.sort((a, b) => a.price - b.price);
    default:
      return copy;
  }
};

export const ProductsPage = ({ category }: Props) => {
  const { products, loading, error } = useProducts();
  const t = useT();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortKey) ?? 'newest';
  const perPageRaw = searchParams.get('perPage') ?? '16';
  const page = Number(searchParams.get('page') ?? '1');
  const queryParam = searchParams.get('query') ?? '';
  const [queryInput, setQueryInput] = useState(queryParam);
  const debouncedQuery = useDebounce(queryInput, 300);

  // Reset scroll when category changes (navigating between /phones, /tablets, etc.)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  // Smoothly scroll back to the catalog top whenever sort/page/perPage/query
  // changes, so users always see the updated list from the start.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sort, perPageRaw, page, queryParam]);

  useEffect(() => {
    setQueryInput(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (debouncedQuery === queryParam) return;
    const next = new URLSearchParams(searchParams);
    if (debouncedQuery) {
      next.set('query', debouncedQuery);
      next.delete('page');
    } else {
      next.delete('query');
    }
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };

  const filtered = useMemo(() => {
    const inCategory = products.filter(p => p.category === category);
    const q = queryParam.trim().toLowerCase();
    return q
      ? inCategory.filter(p => p.name.toLowerCase().includes(q))
      : inCategory;
  }, [products, category, queryParam]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const perPage =
    perPageRaw === 'all' ? sorted.length || 1 : Number(perPageRaw) || 16;
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const sliceStart = (safePage - 1) * perPage;
  const visible = sorted.slice(sliceStart, sliceStart + perPage);

  const { titleKey, crumbKey } = TITLE_KEYS[category];

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ label: t(crumbKey) }]} />

      <h1 className={styles.h1}>{t(titleKey)}</h1>
      <p className={styles.count}>
        {loading ? '...' : `${filtered.length} ${t('count.models')}`}
      </p>

      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('sort.by')}</span>
          <select
            className={styles.select}
            value={sort}
            onChange={e => updateParam('sort', e.target.value)}
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>
                {t(s.labelKey)}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>{t('sort.itemsOnPage')}</span>
          <select
            className={styles.select}
            value={perPageRaw}
            onChange={e => updateParam('perPage', e.target.value)}
          >
            {PER_PAGES.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <Loader />}
      {error && (
        <p className={styles.error}>
          {t('common.failedToLoad')}: {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className={styles.empty}>
          {queryParam
            ? `${t('product.noMatch')} "${queryParam}"`
            : t('product.noProducts')}
        </p>
      )}

      {!loading && !error && visible.length > 0 && (
        <>
          <div className={styles.grid}>
            {visible.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {perPageRaw !== 'all' && (
            <Pagination
              total={sorted.length}
              perPage={perPage}
              current={safePage}
              onChange={n => updateParam('page', String(n))}
            />
          )}
        </>
      )}
    </div>
  );
};
