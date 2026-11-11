import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import styles from './CatalogPage.module.scss';

interface Props {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
}

const categoryNames = {
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
};

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';
  const perPageParam = searchParams.get('perPage') || 'all';
  const requestedPage = Number(searchParams.get('page')) || 1;

  const loadProducts = async () => {
    try {
      setLoading(true);
      setHasError(false);

      const allProducts = await getProducts();

      setProducts(allProducts.filter(product => product.category === category));
    } catch {
      setHasError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'price') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  const itemsPerPage =
    perPageParam === '4' || perPageParam === '8' || perPageParam === '16'
      ? Number(perPageParam)
      : sortedProducts.length || 1;

  const totalPages =
    perPageParam === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / itemsPerPage);

  const currentPage =
    totalPages > 0 ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visibleProducts =
    perPageParam === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const updateParams = (changes: Record<string, string | null>) => {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);

      Object.entries(changes).forEach(([key, value]) => {
        if (value === null) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });

      return next;
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({
      sort: event.target.value,
      page: null,
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    updateParams({
      perPage: value === 'all' ? null : value,
      page: null,
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className={styles.message}>
        <p>Something went wrong</p>

        <button
          type="button"
          className={styles.reloadButton}
          onClick={loadProducts}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <p className={styles.count}>{sortedProducts.length} models</p>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>

          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="per-page-select" className={styles.label}>
            Items on page
          </label>

          <select
            id="per-page-select"
            value={perPageParam}
            onChange={handlePerPageChange}
            className={styles.select}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">all</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <p className={styles.empty}>
          {query.trim()
            ? `There are no ${categoryNames[category]} matching the query`
            : `There are no ${categoryNames[category]} yet`}
        </p>
      ) : (
        <>
          <div className={styles.grid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageButton}
                disabled={currentPage === 1}
                onClick={() =>
                  updateParams({
                    page: currentPage === 2 ? null : String(currentPage - 1),
                  })
                }
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                page => (
                  <button
                    type="button"
                    key={page}
                    className={`${styles.pageButton} ${
                      currentPage === page ? styles.active : ''
                    }`}
                    onClick={() =>
                      updateParams({
                        page: page === 1 ? null : String(page),
                      })
                    }
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                className={styles.pageButton}
                disabled={currentPage === totalPages}
                onClick={() =>
                  updateParams({
                    page: String(currentPage + 1),
                  })
                }
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
