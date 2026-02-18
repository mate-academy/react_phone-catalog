import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchPage.module.scss';
import { Product } from '../../types/Product';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getSearchWith } from '../../utils/searchHelper';
import * as productService from '../../services/productService';

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    productService
      .getAllProducts()
      .then(setProducts)
      .catch(e => {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setSearchParams(getSearchWith(searchParams, { query: newQuery || null }));
  };

  const filteredProducts = useMemo(() => {
    if (!query) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();

    return products.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [products, query]);

  const resultsCount = filteredProducts.length;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.searchPage}>
      <h1 className={styles.title}>Search</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search for a product..."
          className={styles.searchInput}
        />
        {query && (
          <button
            onClick={() =>
              setSearchParams(getSearchWith(searchParams, { query: null }))
            }
            className={styles.clearButton}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <>
          {query ? (
            <p className={styles.resultsCount}>
              {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
            </p>
          ) : (
            <p>Please enter a search term to find products.</p>
          )}

          {query && resultsCount > 0 && (
            <div className={styles.resultsGrid}>
              {filteredProducts.map(product => (
                <ProductCard key={product.itemId} product={product} />
              ))}
            </div>
          )}

          {query && !isLoading && resultsCount === 0 && (
            <p>No products found matching your search.</p>
          )}
        </>
      )}
    </div>
  );
}
