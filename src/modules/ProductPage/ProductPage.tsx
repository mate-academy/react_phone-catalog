import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchClient';
import { ProductCard } from '../shared/components/ProductCard';
import { sortProducts } from '../../utils/sortProducts';
import { Pagination } from './components/Pagination';
import { Loader } from '../shared/ui/Loader/Loader';
import { SearchIcon, CloseIcon } from '../shared/ui/Icons/Icons';
import styles from './ProductPage.module.scss';

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [localQuery, setLocalQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { category = '' } = useParams<{ category: string }>();
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const perPageParam = searchParams.get('perPage') || '8';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(allProducts => {
        setCategoryProducts(
          allProducts.filter(item => item.category === category),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchParams(params => {
        const newParams = new URLSearchParams(params);

        if (value) {
          newParams.set('query', value);
        } else {
          newParams.delete('query');
        }

        newParams.delete('page');

        return newParams;
      });
    }, 500),
    [],
  );

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === '8') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(newPage));
    }

    setSearchParams(newParams);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const filteredByQuery = categoryProducts.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const products = sortProducts(filteredByQuery, sort);

  const perPage =
    perPageParam === 'all' ? products.length || 1 : Number(perPageParam);
  const start = (page - 1) * perPage;
  const paginatedProducts = products.slice(start, start + perPage);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className={styles.message}>
          <p>Something went wrong</p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={handleReload}
          >
            Reload
          </button>
        </div>
      );
    }

    if (categoryProducts.length === 0) {
      return <p className={styles.message}>There are no {category} yet</p>;
    }

    if (products.length === 0) {
      return (
        <p className={styles.message}>
          There are no {category} matching the query
        </p>
      );
    }

    return (
      <>
        <p className={styles.count}>{products.length} models</p>

        <div className={styles.grid}>
          {paginatedProducts.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>

        {perPage < products.length && (
          <Pagination
            total={products.length}
            perPage={perPage}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{categoryTitle}</h1>

      <div className={styles.toolbar}>
        <label className={styles.searchField}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder={`Search in ${category}...`}
            value={localQuery}
            onChange={event => {
              setLocalQuery(event.target.value);
              handleSearchChange(event.target.value);
            }}
          />
          {localQuery && (
            <button
              type="button"
              className={styles.clearButton}
              aria-label="Limpar busca"
              onClick={() => {
                setLocalQuery('');
                handleSearchChange('');
              }}
            >
              <CloseIcon />
            </button>
          )}
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Sort by</span>
          <select
            className={styles.select}
            value={sort}
            onChange={event => handleSortChange(event.target.value)}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Items on page</span>
          <select
            className={styles.select}
            value={perPageParam}
            onChange={event => handlePerPageChange(event.target.value)}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All' : option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {renderContent()}
    </div>
  );
};
