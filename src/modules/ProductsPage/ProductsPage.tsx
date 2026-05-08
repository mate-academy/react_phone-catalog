import React, {
  useState,
  useEffect,
  useMemo,
  // useCallback,
  // useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, SortOption, PerPageOption } from '../../types';
import { getProducts } from '../../utils/api';
import { ProductCard } from '../../components/ProductCard';
// import { debounce } from '../../utils/debounce';
import styles from './ProductsPage.module.scss';

interface ProductsPageProps {
  category: 'phones' | 'tablets' | 'accessories';
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sort = (searchParams.get('sort') as SortOption) || 'age';
  const perPageParam = searchParams.get('perPage');
  const perPage: PerPageOption =
    perPageParam === 'all'
      ? 'all'
      : (parseInt(perPageParam || '16', 10) as 4 | 8 | 16);
  const pageParam = searchParams.get('page') || '1';
  const page = parseInt(pageParam, 10) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const filteredProducts = allProducts.filter(
          p => p.category === category,
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (sort) {
      case 'age':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }, [products, sort, query]);

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.ceil(sortedAndFilteredProducts.length / perPage);

  // Validate page: if current page > totalPages, reset to 1
  const validPage = page > totalPages ? 1 : page;

  const startIndex = perPage === 'all' ? 0 : (validPage - 1) * perPage;
  const endIndex =
    perPage === 'all' ? sortedAndFilteredProducts.length : startIndex + perPage;
  const displayedProducts = sortedAndFilteredProducts.slice(
    startIndex,
    endIndex,
  );

  // Reset page if it became invalid
  useEffect(() => {
    if (page !== validPage) {
      const params = new URLSearchParams(searchParams);

      params.set('page', validPage.toString());
      setSearchParams(params, { replace: true });
    }
  }, [page, validPage, searchParams, setSearchParams]);

  const handleSortChange = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', newSort);
    params.set('page', '1'); // Reset to first page
    setSearchParams(params);
  };

  const handlePerPageChange = (newPerPage: PerPageOption) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', newPerPage.toString());
    params.set('page', '1'); // Reset to first page
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  // const debouncedSearchRef = useRef(
  //   debounce((newQuery: string) => {
  //     const params = new URLSearchParams(searchParams);

  //     if (newQuery) {
  //       params.set('query', newQuery);
  //     } else {
  //       params.delete('query');
  //     }

  //     params.set('page', '1');
  //     setSearchParams(params);
  //   }, 500),
  // );

  // const handleSearchChange = useCallback((newQuery: string) => {
  //   debouncedSearchRef.current(newQuery);
  // }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  const categoryTitles = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  return (
    <div className={styles.productsPage}>
      <h1>{categoryTitles[category]} </h1>

      {query && (
        <p className={styles.searchResults}>
          {sortedAndFilteredProducts.length === 0
            ? `There are no ${category} matching the query`
            : `${sortedAndFilteredProducts.length} ${category} found`}
        </p>
      )}

      {!query && sortedAndFilteredProducts.length === 0 && (
        <p>There are no {category} yet</p>
      )}

      {sortedAndFilteredProducts.length > 0 && (
        <>
          <div className={styles.controls}>
            {/* <div className={styles.search}>
              <input
                type="search"
                placeholder={`Search ${category}...`}
                value={query}
                onChange={e => handleSearchChange(e.target.value)}
              />
            </div> */}

            <div className={styles.sort}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sort}
                onChange={e => handleSortChange(e.target.value as SortOption)}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={styles.perPage}>
              <label htmlFor="perPage">Items on page:</label>
              <select
                id="perPage"
                value={perPage}
                onChange={e =>
                  handlePerPageChange(e.target.value as PerPageOption)
                }
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value="all">all</option>
              </select>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {perPage !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={validPage === 1}
                onClick={() => handlePageChange(validPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {validPage} of {totalPages}
              </span>
              <button
                disabled={validPage === totalPages}
                onClick={() => handlePageChange(validPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
