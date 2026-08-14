import React from 'react';
import styles from './CatalogPage.module.scss';
import { CustomSelect } from './components/CustomSelect';
import { ProductCard } from '../../shared/components/ProductCard';
import { Pagination } from './components/Pagination';
import { Link } from 'react-router-dom';
import { useCatalogProducts } from '../../shared/hooks/useCatalogProducts';
import { SkeletonCardLoader } from '../../shared/components/SkeletonCardLoader';

export const CatalogPage = () => {
  const {
    products,
    visibleProducts,
    isLoading,
    hasError,
    currentCategory,
    currentSortLabel,
    handleSortChange,
    handlePerPageChange,
    currentPerPage,
    itemsPerPageNumber,
    currentPageNumber,
    PAGE_TITLES,
  } = useCatalogProducts();

  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <span className={styles.homeIcon} aria-label="Home" />
        </Link>
        <span className={styles.rightArrowIcon} aria-label="Right arrow" />
        <p className={styles.breadcrumbsTitle}>{currentCategory}</p>
      </div>

      <h1 className={styles.title}>
        {PAGE_TITLES[currentCategory] || currentCategory}
      </h1>
      <p className={styles.modelsCount}>{products.length} models</p>

      <div className={styles.filters}>
        <CustomSelect
          label="Sort by"
          options={['Newest', 'Alphabetically', 'Cheapest']}
          value={currentSortLabel}
          onChange={handleSortChange}
        />

        <CustomSelect
          label="Items on page"
          options={['4', '8', '16', 'All']}
          value={currentPerPage}
          onChange={handlePerPageChange}
        />
      </div>

      <div className={styles.productsGrid}>
        {hasError && <div>Something went wrong...</div>}

        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCardLoader key={i} />
          ))}

        {!isLoading && !hasError && products.length === 0 && (
          <p>There are no {currentCategory} yet</p>
        )}

        {!isLoading &&
          !hasError &&
          visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {products.length > itemsPerPageNumber && (
        <div className={styles.pagination}>
          <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPageNumber}
            currentPage={currentPageNumber}
          />
        </div>
      )}
    </main>
  );
};
