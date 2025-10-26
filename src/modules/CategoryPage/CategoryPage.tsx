import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProductsByCategoryWithPagination } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './CategoryPage.module.scss';
import { Dropdown } from '../shared/components/Dropdown/Dropdown';
import { Pagination } from '../shared/components/Pagination';
import { SortBy } from '../../constants/sortOptions';
import { useSearch } from '../../contexts';

export const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { searchQuery, setShowSearch, setSearchPlaceholder } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
    if (category) {
      setLoading(true);
      getProductsByCategoryWithPagination(category, currentPage, productsPerPage, sortBy)
        .then(data => {
          setProducts(data.products);
          setTotal(data.total);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category, currentPage, sortBy, productsPerPage]);

  // Filter products by search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const totalPages = Math.ceil(total / productsPerPage);

  const updateSearchParams = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value.toString());
    });

    setSearchParams(newParams);
  };

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

  const getCategoryName = () => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  };

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.categoryTitle}>{getCategoryName()}</h1>
      <p className={styles.productCount}>{total} {t('category.models')}</p>

      <div className={styles.controls}>
        <div className={styles.filters}>
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder={t('category.sortBy')}
            label={t('category.sortBy')}
            className={styles.sortDropdown}
          />
          <Dropdown
            options={productsPerPageOption}
            value={productsPerPage}
            onChange={handlePerPageChange}
            placeholder={t('category.itemsOnPage')}
            label={t('category.itemsOnPage')}
            className={styles.perPageDropdown}
          />
        </div>
      </div>

      {loading && <p>{t('common.loading')}</p>}

      {!loading && filteredProducts.length === 0 && searchQuery && (
        <div className={styles.noResults}>
          <p>{t('category.noProductsMatching', { category })}</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className={styles.productsList}>
          {filteredProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length > 0 && !searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}