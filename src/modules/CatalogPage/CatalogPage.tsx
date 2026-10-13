import { useState, useEffect, type FC, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard, Product } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { Search } from '../../components/Search';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './CatalogPage.module.scss';
import React from 'react';

interface Props {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
}

export const CatalogPage: FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';

  const pageParam = searchParams.get('page') || '1';
  const perPageParam = searchParams.get('perPage') || '16';

  const currentPage = parseInt(pageParam, 10) || 1;
  const isAll = perPageParam === 'all';
  const perPage = isAll ? products.length : parseInt(perPageParam, 10) || 16;

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`api/${category}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category]);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'age') {
      return b.priceRegular - a.priceRegular;
    }

    if (sort === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sort === 'cheapest') {
      return a.priceDiscount - b.priceDiscount;
    }

    return 0;
  });

  const startIndex = (currentPage - 1) * perPage;
  const visibleProducts = isAll
    ? sortedProducts
    : sortedProducts.slice(startIndex, startIndex + perPage);

  if (loading) {
    return <div className={styles.centerMessage}>Loading {category}...</div>;
  }

  if (error) {
    return (
      <div className={styles.centerMessage}>
        <p>Something went wrong</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.reloadBtn}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{sortedProducts.length} models</p>

      <div className={styles.controls}>
        {/* Поиск перенесен на самый верх */}
        <div className={styles.selectGroup}>
          <span className={styles.label}>Search</span>
          <Search placeholder={`Search in ${title.toLowerCase()}...`} />
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
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
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <>
          <div className={styles.grid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!isAll && (
            <Pagination
              totalItems={sortedProducts.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className={styles.centerMessage}>
          There are no {category} yet matching the query.
        </div>
      )}
    </div>
  );
};
