import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchAllProducts } from '../../../api/fetchProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import type { Category, Product } from '../../../types';
import './CatalogPage.scss';

const TITLES: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const VALID_CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

function sortProducts(products: Product[], sort: string): Product[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });
}

export function CatalogPage() {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const sort = searchParams.get('sort') ?? 'age';
  const perPageParam = searchParams.get('perPage') ?? '16';
  const page = Number(searchParams.get('page') ?? '1');

  const isValidCategory = VALID_CATEGORIES.includes(category as Category);
  const title = isValidCategory ? TITLES[category as Category] : 'Catalog';

  useEffect(() => {
    setLoading(true);
    fetchAllProducts()
      .then(setAllProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => allProducts.filter((p) => p.category === category),
    [allProducts, category],
  );

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const perPage = perPageParam === 'all' ? sorted.length : Number(perPageParam);
  const totalPages = perPage > 0 ? Math.ceil(sorted.length / perPage) : 1;
  const safePage = Math.min(Math.max(page, 1), totalPages || 1);

  const paginated = useMemo(() => {
    if (perPageParam === 'all') {
      return sorted;
    }
    const start = (safePage - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, safePage, perPage, perPageParam]);

  const setParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, value);
      if (key !== 'page') {
        next.set('page', '1');
      }
      return next;
    });
  };

  return (
    <div className="catalog-page">
      <Breadcrumbs items={[{ label: title }]} />

      <h1 className="catalog-page__title">{title}</h1>
      <p className="catalog-page__count">{filtered.length} models</p>

      <div className="catalog-page__controls">
        <Dropdown
          label="Sort by"
          value={sort}
          options={SORT_OPTIONS}
          onChange={(v) => setParam('sort', v)}
        />
        <Dropdown
          label="Items on page"
          value={perPageParam}
          options={PER_PAGE_OPTIONS}
          onChange={(v) => setParam('perPage', v)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="catalog-page__grid">
            {paginated.map((product) => (
              <ProductCard key={product.itemId} product={product} />
            ))}
          </div>

          {perPageParam !== 'all' && (
            <Pagination
              total={sorted.length}
              perPage={perPage}
              currentPage={safePage}
              onPageChange={(p) => setParam('page', String(p))}
            />
          )}
        </>
      )}
    </div>
  );
}
