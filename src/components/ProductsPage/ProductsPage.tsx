import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { SortSelect, SortOption } from '../../components/SortSelect';
import { PerPageSelect, PerPageOption } from '../../components/PerPageSelect';
import { NotFound } from '../../components/NotFound';
import { Product } from '../../types/Product';
import { CategoryType as ProductType } from '../../types/Product';
import { getProducts } from '../../utils/Api';
import styles from './ProductsPage.module.scss';

import errorImage from './images/error.png';
import itemsLostImage from './images/items-lost.png';

interface Props {
  productType: ProductType;
  title: string;
  breadcrumbLabel: string;
  emptyMessage: string;
}

export const ProductsPage: React.FC<Props> = ({ productType, title, breadcrumbLabel, emptyMessage }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get URL params
  const sortParam = (searchParams.get('sort') as SortOption) || 'age';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const perPageParam = searchParams.get('perPage') || 'all';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const allProducts = await getProducts();
        const filteredProducts = allProducts.filter(product => product.category === productType);

        setProducts(filteredProducts);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [productType]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortParam) {
      case 'age':
        return sorted.sort((a, b) => b.year - a.year);
      case 'title':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [products, sortParam]);

  // Pagination
  const itemsPerPage = perPageParam === 'all' ? sortedProducts.length : parseInt(perPageParam, 10);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentPage = Math.min(pageParam, totalPages) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Update URL params
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'age' && key === 'sort') {
      params.delete('sort');
    } else if (value === '1' && key === 'page') {
      params.delete('page');
    } else if (value === 'all' && key === 'perPage') {
      params.delete('perPage');
    } else {
      params.set(key, value);
    }

    // Reset page when changing sort or perPage
    if (key !== 'page') {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const handleReload = () => {
    window.location.reload();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Breadcrumb items={[{ label: breadcrumbLabel }]} />
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Breadcrumb items={[{ label: breadcrumbLabel }]} />
          <h1 className={styles.title}>{title}</h1>
          <NotFound variant="error" title={t('somethingWentWrong')} message={t('pleaseTryAgain')} image={errorImage} buttonText={t('reload')} onButtonClick={handleReload} className={styles.notFoundState} />
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Breadcrumb items={[{ label: breadcrumbLabel }]} />
          <h1 className={styles.title}>{title}</h1>
          <NotFound variant="product-not-found" title={emptyMessage} message={t('emptyMessage')} image={itemsLostImage} buttonText={t('goBack')} className={styles.notFoundState} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: breadcrumbLabel }]} />

        {/* Page title */}
        <h1 className={styles.title}>{title}</h1>

        {/* Models count */}
        <p className={styles.modelsCount}>{t('models', { count: products.length })}</p>

        {/* Filters */}
        <div className={styles.filters}>
          {/* Sort by */}
          <SortSelect value={sortParam as SortOption} onChange={value => updateParams('sort', value)} />

          {/* Items on page */}
          <PerPageSelect value={perPageParam as PerPageOption} onChange={value => updateParams('perPage', value)} />
        </div>

        {/* Products grid */}
        <div className={styles.productsGrid}>
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {perPageParam !== 'all' && totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={page => updateParams('page', page.toString())} />}
      </div>
    </div>
  );
};
