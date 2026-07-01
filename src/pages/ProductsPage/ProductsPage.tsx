import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './ProductsPage.module.scss';

import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { ProductSkeleton } from '../../components/ProductSkeleton';

interface ProductsPageProps {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  category,
  title,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPageStr = searchParams.get('perPage') || 'all';
  const pageStr = searchParams.get('page') || '1';
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const currentPage = parseInt(pageStr, 10) || 1;

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      setError('Could not load products. Something went wrong.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.title = `${title} | Gadgets`;
    loadData();
  }, [category, title]);

  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });

    if (nextParams.get('sort') === 'age') {
      nextParams.delete('sort');
    }

    if (nextParams.get('perPage') === 'all') {
      nextParams.delete('perPage');
    }

    if (nextParams.get('page') === '1') {
      nextParams.delete('page');
    }

    setSearchParams(nextParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams({ sort: e.target.value, page: '1' });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrlParams({ perPage: e.target.value, page: '1' });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({ page: String(page) });
  };

  if (error) {
    return (
      <div className={`${styles.productsPage} container`}>
        <Breadcrumbs category={category} categoryLabel={title} />
        <div className={styles.errorState}>
          <p>{error}</p>
          <button type="button" onClick={loadData} className={styles.retryBtn}>
            Reload
          </button>
        </div>
      </div>
    );
  }

  const categoryProducts = products.filter(p => p.category === category);

  const queryWords = query.split(/\s+/).filter(Boolean);
  const filteredProducts = categoryProducts.filter(p => {
    const nameLower = p.name.toLowerCase();

    return queryWords.every(word => nameLower.includes(word));
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year || a.id - b.id;
    }
  });

  const perPage =
    perPageStr === 'all' ? sortedProducts.length : parseInt(perPageStr, 10);
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const activePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const paginatedProducts = sortedProducts.slice(
    (activePage - 1) * perPage,
    activePage * perPage,
  );

  const handleClearSearch = () => {
    updateUrlParams({ query: null });
  };

  return (
    <div className={`${styles.productsPage} container`}>
      <Breadcrumbs category={category} categoryLabel={title} />

      <h1 className={styles.title}>{title} page</h1>

      {loading ? (
        <>
          <div className={styles.count}>Loading catalog...</div>
          <div className={styles.grid}>
            {Array.from({ length: perPageStr === 'all' ? 8 : perPage }).map(
              (_, idx) => (
                <ProductSkeleton key={idx} />
              ),
            )}
          </div>
        </>
      ) : categoryProducts.length === 0 ? (
        <div className={styles.noItems}>There are no {category} yet</div>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.noItems}>
          <p>There are no {category} matching the query</p>

          <button
            type="button"
            className={styles.clearSearchBtn}
            onClick={handleClearSearch}
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <div className={styles.count}>{totalItems} models</div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.label}>Sort by</span>
              <div className={styles.selectWrapper}>
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className={styles.select}
                  aria-label="Sort products by"
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
                <i
                  className={`fa-solid fa-chevron-down ${styles.selectArrow}`}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    fontSize: '10px',
                    color: 'var(--color-text-secondary)',
                  }}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.label}>Items on page</span>
              <div className={styles.selectWrapper} style={{ width: '128px' }}>
                <select
                  value={perPageStr}
                  onChange={handlePerPageChange}
                  className={styles.select}
                  aria-label="Items on page"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="all">all</option>
                </select>
                <i
                  className="fa-solid fa-chevron-down"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    fontSize: '10px',
                    color: 'var(--color-text-secondary)',
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {perPageStr !== 'all' && (
            <Pagination
              total={totalItems}
              perPage={perPage}
              currentPage={activePage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
