import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CATEGORY_CONFIG } from '@/constants/categoryConfig';
import styles from './CatalogPage.module.scss';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types/product';
import { fetchAllProducts } from '@/api/products';
import { useProductFilters } from '@/features/products/hooks/useProductFilters';
import { CatalogControls } from '@/features/products/components/CatalogControls';
import { Pagination } from '@/components/ui/Pagination';
import { useProductsWithDetails } from '@/features/products/hooks/useProductsWithDetails';
import { ProductCardSkeleton } from '@/features/products/components/ProductCardSkeleton';
import { AnimatePresence, motion } from 'motion/react';

export const CatalogPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryKey = pathname.split('/').filter(Boolean)[0];
  const config = CATEGORY_CONFIG[categoryKey];

  const sortBy = searchParams.get('sort') || 'newest';

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPageParam = searchParams.get('perPage');
  const perPage = perPageParam === 'all' ? 'all' : Number(perPageParam) || 16;

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const { data: details = [] } = useQuery({
    queryKey: [`${categoryKey}Details`],
    queryFn: config.fetchDetails,
    enabled: !!config,
  });

  const productsWithDetails = useProductsWithDetails(allProducts, details);

  const { paginatedProducts, totalCount } = useProductFilters(
    productsWithDetails,
    categoryKey,
    sortBy,
    currentPage,
    perPage,
  );

  const updateParams = (key: string, value: string) => {
    searchParams.set(key, value);
    if (key !== 'page') {
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
  };

  if (!config) {
    return null;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t(config.titleKey)}</h1>
      <p className={styles.count}>
        {t('categories.models', { count: totalCount })}
      </p>

      <CatalogControls
        sortBy={sortBy}
        perPage={perPage}
        onUpdate={updateParams}
      />
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          <div className={styles.sceletonWraper}>
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {paginatedProducts.map((product: Product) => (
                <div key={product.id} className={styles.card}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {perPage !== 'all' && totalCount > perPage && (
              <div className={styles.paginationWraper}>
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  perPage={perPage}
                  onPageChange={page => updateParams('page', String(page))}
                />
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
