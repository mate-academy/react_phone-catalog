/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Category, isCategory } from '../../types/categories';
import { fetchJSON } from '../../api/client';
import { Product } from '../../types/Product';
import ProductCard from '../../componenst/ProductCard';
import { PaginationTop, PaginationBottom } from '../../componenst/Pagination';
import styles from './Products.module.scss';

type SortOption = 'name' | 'price' | 'price-desc' | 'newest';

const VALID_SORT: SortOption[] = ['name', 'price', 'price-desc', 'newest'];

const Products: React.FC = () => {
  const params = useParams();
  const raw = params.category;
  const category: Category = isCategory(raw) ? raw : 'phones';

  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL
  const sortFromUrl = searchParams.get('sort');
  const perPageFromUrl = Number(searchParams.get('perPage'));
  const pageFromUrl = Number(searchParams.get('page'));

  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortOption>(
    VALID_SORT.includes(sortFromUrl as SortOption)
      ? (sortFromUrl as SortOption)
      : 'newest',
  );
  const [perPage, setPerPage] = useState(
    [4, 8, 12, 16].includes(perPageFromUrl) ? perPageFromUrl : 8,
  );
  const [currentPage, setCurrentPage] = useState(pageFromUrl || 1);

  // Sync state → URL search params
  useEffect(() => {
    setSearchParams(
      { sort: sortBy, perPage: String(perPage), page: String(currentPage) },
      { replace: true },
    );
  }, [sortBy, perPage, currentPage, setSearchParams]);

  // Fetch products
  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);
    setItems(null);
    setCurrentPage(1);

    fetchJSON<Product[]>('api/products.json')
      .then(all => {
        if (!mounted) {
          return;
        }

        const res = all.filter(p => p.category === category);

        setItems(res);
      })
      .catch(err => {
        if (!mounted) {
          return;
        }

        setError(err?.message || 'Failed to load products');
      })
      .finally(() => {
        if (!mounted) {
          return;
        }

        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [category]);

  // Sort and paginate items
  const sortedAndPaginatedItems = useMemo(() => {
    if (!items) {
      return { sorted: [], paginated: [], total: 0 };
    }

    const sorted = [...items].sort((a, b) => {
      const priceA =
        (a as any).priceDiscount ??
        (a as any).priceRegular ??
        (a as any).price ??
        (a as any).fullPrice ??
        0;
      const priceB =
        (b as any).priceDiscount ??
        (b as any).priceRegular ??
        (b as any).price ??
        (b as any).fullPrice ??
        0;

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'newest':
          return ((b as any).year ?? 0) - ((a as any).year ?? 0);
        default:
          return 0;
      }
    });

    const total = sorted.length;
    const start = (currentPage - 1) * perPage;
    const paginated = sorted.slice(start, start + perPage);

    return { sorted, paginated, total };
  }, [items, sortBy, perPage, currentPage]);

  const handleSortChange = (sort: string) => {
    setSortBy(sort as SortOption);
    setCurrentPage(1);
  };

  const handlePerPageChange = (count: number) => {
    setPerPage(count);
    setCurrentPage(1);
  };

  return (
    <section className={styles.productsPage}>
      <h1 className={styles.productsPage__title}>
        {category.charAt(0).toUpperCase() + category.slice(1)} page
      </h1>

      {loading && (
        <div className={styles.productsPage__loaderWrapper}>
          <span className={styles.productsPage__loader} />
        </div>
      )}

      {error && (
        <div>
          <p>Something went wrong: {error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && items && items.length === 0 && (
        <p>There are no {category} yet.</p>
      )}

      {!loading && !error && items && items.length > 0 && (
        <>
          <div className={styles.productsPage__paginationTop}>
            <PaginationTop
              sortBy={sortBy}
              onSortChange={handleSortChange}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>

          <div className={styles.productsPage__grid}>
            {sortedAndPaginatedItems.paginated.map(p => (
              <div className={styles.productsPage__card} key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div className={styles.productsPage__paginationBottom}>
            <PaginationBottom
              total={sortedAndPaginatedItems.total}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Products;
