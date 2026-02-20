/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Category, isCategory } from '../../types/categories';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import ProductCard from '../../componenst/ProductCard';
import { PaginationTop, PaginationBottom } from '../../componenst/Pagination';
import styles from './Products.module.scss';

type SortOption = 'name' | 'price' | 'price-desc' | 'newest';

const Products: React.FC = () => {
  const params = useParams();
  const raw = params.category;
  const category: Category = isCategory(raw) ? raw : 'phones';

  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products
  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);
    setItems(null);
    setCurrentPage(1); // Reset to page 1 when category changes

    getProducts(category)
      .then(res => {
        if (!mounted) {
          return;
        }

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
      return { sorted: [], paginated: [], total: 0, pagesCount: 0 };
    }

    // Sort
    const sorted = [...items].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return (a.price ?? 0) - (b.price ?? 0);
        case 'price-desc':
          return (b.price ?? 0) - (a.price ?? 0);
        case 'newest':
          // Assume items are already in newest-first order from API
          return 0;
        default:
          return 0;
      }
    });

    // Paginate
    const total = sorted.length;
    const pagesCount = Math.ceil(total / perPage);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginated = sorted.slice(start, end);

    return { sorted, paginated, total, pagesCount };
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

      {loading && <p>Loading products…</p>}

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
