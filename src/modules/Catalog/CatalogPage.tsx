import React, { useMemo } from 'react';
import {
  useOutletContext,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { ProductCard } from '../shared/components/ProductCard';
import { Pagination } from '../shared/components/Pagination';
import styles from './CatalogPage.module.scss';
import { ArrowUpIcon } from '../shared/components/Icons';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { scrollToTop } from '../shared/utils/scrollUtils';
import { ContextProps } from '../../types/ContextProps';

export const CatalogPage: React.FC = () => {
  const { categories, products: allProducts } =
    useOutletContext<ContextProps>();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = categories.find(c => c.path === pathname);

  const categoryProducts = useMemo(() => {
    if (!currentCategory) {
      return [];
    }

    return allProducts.filter(p => p.category === currentCategory.id);
  }, [allProducts, currentCategory]);

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleParamChange = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (
      value === 'all' ||
      (name === 'page' && value === '1') ||
      (name === 'sort' && value === 'age')
    ) {
      newParams.delete(name);
    } else {
      newParams.set(name, value);
    }

    if (name !== 'page') {
      newParams.delete('page');
    }

    setSearchParams(newParams);
    scrollToTop();
  };

  const sortedProducts = useMemo(() => {
    const copy = [...categoryProducts];

    switch (sort) {
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      case 'age':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [categoryProducts, sort]);

  const isPaginationVisible =
    perPage !== 'all' && categoryProducts.length > Number(perPage);

  const itemsPerPage =
    perPage === 'all' ? categoryProducts.length : Number(perPage);
  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage, perPage]);

  if (!currentCategory) {
    return <div className={styles.container}>Category not found</div>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.breadcrumbsPlaceholder} />

      <h1 className={styles.title}>{currentCategory?.title}</h1>
      <p className={styles.count}>{categoryProducts.length} models</p>

      <div className={styles.controls}>
        <div className={styles.controlItem}>
          <label className={styles.label} htmlFor="sort">
            Sort by
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="sort"
              value={sort}
              onChange={e => handleParamChange('sort', e.target.value)}
              className={styles.select}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
            <div className={styles.selectIcon}>
              <span className="icon icon--down">
                <ArrowUpIcon />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.controlItem}>
          <label className={styles.label} htmlFor="perPage">
            Items per page
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="perPage"
              value={perPage}
              onChange={e => handleParamChange('perPage', e.target.value)}
              className={styles.select}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
            <div className={styles.selectIcon}>
              <span className="icon icon--down">
                <ArrowUpIcon />
              </span>
            </div>
          </div>
        </div>
      </div>

      {false ? (
        <h2 className={styles.loading}>Loading...</h2>
      ) : (
        <>
          <div className={styles.productsGrid}>
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {isPaginationVisible && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={totalPages}
                current={currentPage}
                onPageChange={page =>
                  handleParamChange('page', page.toString())
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
