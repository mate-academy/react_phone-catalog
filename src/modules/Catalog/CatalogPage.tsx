import React from 'react';
import styles from './CatalogPage.module.scss';
import { useCatalog } from './useCatalog';
import { Pagination } from '../shared/components/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { CatalogControls } from './components/CatalogControls';
import { ProductsGrid } from '../shared/components/ProductsGrid';
import { PageTitle } from '../shared/components/PageTitle';

export const CatalogPage: React.FC = () => {
  const {
    currentCategory,
    categoryProducts,
    visibleProducts,
    sort,
    perPage,
    currentPage,
    totalPages,
    isPaginationVisible,
    handleParamChange,
  } = useCatalog();

  if (!currentCategory) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <PageTitle>{currentCategory.navTitle || currentCategory.title}</PageTitle>

      {categoryProducts.length > 0 ? (
        <>
          <p className={styles.count}>{categoryProducts.length} models</p>

          <CatalogControls
            sort={sort}
            perPage={perPage}
            onParamChange={handleParamChange}
          />

          <ProductsGrid products={visibleProducts} />

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
      ) : (
        <p className={styles.noProducts}>
          There are no {currentCategory.navTitle?.toLowerCase() || 'items'} yet
        </p>
      )}
    </div>
  );
};
