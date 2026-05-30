import { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../shared/components/ProductCard';
import { ControlsBar } from './components/ControlsBar/ControlsBar';
import styles from './CategoryPage.module.scss';
import { SortBy } from '../../constants/sortOptions';
import { useSearch } from '../../contexts';
import { Loader, Pagination } from '../shared';

export const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { searchQuery, setShowSearch, setSearchPlaceholder } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Read from URL params or use defaults
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const sortBy = (searchParams.get('sort') as SortBy) || SortBy.Newest;
  const productsPerPage = parseInt(searchParams.get('perPage') || '16', 10);

  const sortOptions = [
    { value: SortBy.Newest, label: t('category.newest') },
    { value: SortBy.Cheapest, label: t('category.cheapest') },
    { value: SortBy.Alphabetically, label: t('category.alphabetically') },
  ];

  // Enable search in header
  useEffect(() => {
    setShowSearch(true);
    setSearchPlaceholder(t('category.searchIn', { category }));

    return () => {
      setShowSearch(false);
    };
  }, [category, setShowSearch, setSearchPlaceholder, t]);

  const productsPerPageOption = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: 32, label: '32' },
  ];

  useEffect(() => {
    if (!category) {
      setProducts([]);

      return;
    }

    setIsLoading(true);
    getProducts()
      .then(allProducts => {
        const productsFromCategory = allProducts.filter(
          product => product.category === category,
        );

        setProducts(productsFromCategory);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case SortBy.Newest:
        sorted.sort((a, b) => b.year - a.year);
        break;
      case SortBy.Alphabetically:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.Cheapest:
        sorted.sort((a, b) => a.price - b.price);
        break;
    }

    return sorted;
  }, [products, sortBy]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const hasSearchQuery = normalizedQuery.length > 0;

  const filteredProducts = useMemo(() => {
    if (!hasSearchQuery) {
      return sortedProducts;
    }

    return sortedProducts.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [sortedProducts, hasSearchQuery, normalizedQuery]);

  const totalProducts = filteredProducts.length;

  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));

  const safePage = Math.min(currentPage, totalPages);

  const visibleProducts = useMemo(() => {
    const start = (safePage - 1) * productsPerPage;

    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, safePage, productsPerPage]);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | number>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        newParams.set(key, value.toString());
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: string | number) => {
    updateSearchParams({ sort: value, page: 1 });
  };

  const handlePerPageChange = (value: string | number) => {
    updateSearchParams({ perPage: value, page: 1 });
  };

  useEffect(() => {
    if (currentPage !== safePage) {
      updateSearchParams({ page: safePage });
    }
  }, [currentPage, safePage, updateSearchParams]);

  const getCategoryName = () => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.categoryTitle}>{getCategoryName()}</h1>

      <ControlsBar
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        productsPerPageOptions={productsPerPageOption}
        productsPerPage={productsPerPage}
        onPerPageChange={handlePerPageChange}
        totalProducts={totalProducts}
        loading={isLoading}
        searchQuery={searchQuery}
      />

      {!isLoading && filteredProducts.length === 0 && searchQuery && (
        <div className={styles.noResults}>
          <p>{t('category.noProductsMatching', { category })}</p>
        </div>
      )}

      {!isLoading && visibleProducts.length > 0 && (
        <div className={styles.productsList}>
          {visibleProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
