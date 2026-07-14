import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../shared/components/ProductCard';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select/Select';
import { getProducts } from '../shared/utils/api';
import { Product } from '../shared/types/Product';
import { Loader } from '../shared/components/Loader';

const categoryTitles: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'expensive', label: 'Expensive' },
];

const perPageOptions = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 0, label: 'All' },
];

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const [hasError, setHasError] = useState(false);

  const sortBy = searchParams.get('sort') || 'age';

  const itemsPerPage =
    searchParams.get('perPage') === 'all'
      ? 0
      : Number(searchParams.get('perPage')) || 16;

  const currentPage = Number(searchParams.get('page')) || 1;

  const updateSearchParams = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => {
        const filteredData = category
          ? data.filter(p => p.category === category)
          : data;

        setProducts(filteredData);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    updateSearchParams({
      page: null,
    });
  }, [category]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return products;
    }

    const words = query.toLowerCase().split(/\s+/);

    return products.filter(product =>
      words.every(
        word =>
          product.name.toLowerCase().includes(word) ||
          product.color.toLowerCase().includes(word),
      ),
    );
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];

    switch (sortBy) {
      case 'alphabetically':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheapest':
        return copy.sort((a, b) => a.price - b.price);
      case 'expensive':
        return copy.sort((a, b) => b.price - a.price);
      case 'age':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [filteredProducts, sortBy]);

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 0) {
      return sortedProducts;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  const pageTitle = category
    ? categoryTitles[category] || 'Catalog'
    : 'Catalog';

  if (!isLoading && filteredProducts.length === 0 && query) {
    return (
      <div className={styles.catalog_page}>
        <Breadcrumbs category={category} />

        <h1>{pageTitle}</h1>

        <h2>There are no {category} matching the query</h2>
      </div>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className={styles.catalog_page}>
        <Breadcrumbs category={category} />

        <h1>{pageTitle}</h1>

        <h2>There are no {category} yet</h2>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.catalog_page}>
        <h2>Something went wrong</h2>

        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return (
    <div className={styles.catalog_page}>
      <Breadcrumbs category={category} />

      <h1 className={styles.catalog_page__title}>{pageTitle}</h1>
      <p className={styles.catalog_page__models_count}>
        {products.length} models
      </p>

      <div className={styles.catalog_page__filters}>
        <div className={styles.catalog_page__filter_block}>
          <Select
            label="Sort by"
            value={sortBy}
            options={sortOptions}
            onChange={value =>
              updateSearchParams({
                sort: value === 'age' ? null : String(value),
                page: null,
              })
            }
            customClass={styles.catalog_page__filter_sort}
          />
        </div>

        <div className={styles.catalog_page__filter_block}>
          <Select
            label="Items on page"
            value={itemsPerPage}
            options={perPageOptions}
            onChange={value =>
              updateSearchParams({
                perPage: Number(value) === 0 ? null : String(value),
                page: null,
              })
            }
            customClass={styles.catalog_page__filter_items}
          />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.catalog_page__grid}>
            {visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.itemId}
                category={category || ''}
                img={product.image}
                name={product.name}
                capacity={product.capacity}
                priceRegular={product.fullPrice}
                priceDiscount={product.price}
                ram={product.ram}
                screen={product.screen}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={page =>
                updateSearchParams({
                  page: page === 1 ? null : String(page),
                })
              }
            />
          )}
        </>
      )}
    </div>
  );
};
