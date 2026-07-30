import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '@/api/products';
import { Product, ProductCategory } from '@/types/Product';
import { Loader } from '@/components/Loader';
import { ProductsList } from '@/components/ProductsList';
import { SortSelect } from './components/SortSelect';
import { PerPageSelect } from './components/PerPageSelect';
import { Pagination } from './components/Pagination';
import { useCategoryQueryParams } from './hooks/useCategoryQueryParams';
import styles from './CategoryPage.module.scss';

type Props = {
  category: ProductCategory;
  title: string;
  emptyMessage: string;
};

const sortProducts = (products: Product[], sort: string | null) => {
  const sorted = [...products];

  switch (sort) {
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    case 'age':
    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
};

export const CategoryPage = ({ category, title, emptyMessage }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { sort, page, perPage, setSort, setPage, setPerPage } =
    useCategoryQueryParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const categoryProducts = useMemo(
    () =>
      sortProducts(
        products.filter(product => product.category === category),
        sort,
      ),
    [products, category, sort],
  );

  const perPageCount =
    perPage === 'all' ? categoryProducts.length : Number(perPage);
  const pageCount = Math.max(
    1,
    Math.ceil(categoryProducts.length / (perPageCount || 1)),
  );
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = categoryProducts.slice(
    (currentPage - 1) * perPageCount,
    currentPage * perPageCount,
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>

      {!isLoading && !hasError && (
        <p className={styles.count}>
          {categoryProducts.length} model
          {categoryProducts.length === 1 ? '' : 's'}
        </p>
      )}

      {isLoading && <Loader />}

      {hasError && (
        <div className={styles.error}>
          <p>Something went wrong</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      )}

      {!isLoading && !hasError && categoryProducts.length === 0 && (
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      )}

      {!isLoading && !hasError && categoryProducts.length > 0 && (
        <>
          <div className={styles.controls}>
            <SortSelect value={sort} onChange={setSort} />
            <PerPageSelect value={perPage} onChange={setPerPage} />
          </div>

          <ProductsList products={visibleProducts} />

          <Pagination
            total={categoryProducts.length}
            perPage={perPageCount}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
