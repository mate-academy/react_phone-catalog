import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CATEGORY_CONFIG } from '@/constants/categoryConfig';
import styles from './CatalogPage.module.scss';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types/product';
import { fetchAllProducts } from '@/api/products';
import { useProductFilters } from '@/features/products/hooks/useProductFilters';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { CatalogControls } from '@/features/products/components/CatalogControls';

export const CatalogPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryKey = pathname.split('/').filter(Boolean)[0];
  const config = CATEGORY_CONFIG[categoryKey];

  const sortBy = searchParams.get('sort') || 'newest';
  const perPage = Number(searchParams.get('perPage')) || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const { paginatedProducts, totalCount } = useProductFilters(
    allProducts,
    categoryKey,
    sortBy,
    currentPage,
    perPage,
  );

  const updateParams = (key: string, value: string) => {
    searchParams.set(key, value);
    if (key !== 'page') searchParams.set('page', '1'); // Скидаємо сторінку при зміні фільтрів
    setSearchParams(searchParams);
  };

  if (!config) return null;

  return (
    <div>
      <h1 className={styles.title}>{t(config.titleKey)}</h1>
      <p className={styles.count}>
        {t('categories.models', { count: totalCount })}
      </p>

      <CatalogControls
        sortBy={sortBy}
        perPage={perPage}
        onUpdate={updateParams}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Сітка товарів */}
          <div className={styles.grid}>
            {paginatedProducts.map((product: Product) => (
              <div key={product.id} className={styles.card}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Пагінація */}
          {totalCount > perPage && (
            <div className={styles.paginationWrapper}>
              <Paginator
                first={(currentPage - 1) * perPage}
                rows={perPage}
                totalRecords={totalCount}
                onPageChange={(e: PaginatorPageChangeEvent) =>
                  updateParams('page', String(e.page + 1))
                }
                template="PrevPageLink PageLinks NextPageLink"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
