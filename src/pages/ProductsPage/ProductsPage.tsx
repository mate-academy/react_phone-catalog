import styles from './ProductsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
// eslint-disable-next-line max-len
import { ProductsFilters } from '../../components/ProductsFilters/ProductsFilters';
import { ProductsGrid } from '../../components/ProductsGrid/ProductsGrid';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { useProducts } from '../../hooks/useProducts';
import { useProductsSearchParams } from '../../hooks/useProductsSearchParams';
import { usePagination } from '../../hooks/usePagination';

export type Category = 'phones' | 'tablets' | 'accessories';

const titles: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

type Props = {
  category: Category;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const { sort, perPage, page, updateParam } = useProductsSearchParams();

  const { products, loading, error, reload } = useProducts(category);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'price':
        return a.price - b.price;
      case 'title':
        return a.name.localeCompare(b.name);
      default:
        return b.year - a.year;
    }
  });

  const { items, totalPages } = usePagination(
    sortedProducts,
    page,
    perPage === 'all' ? 'all' : Number(perPage),
  );

  return (
    <div className={`${styles.main} ${styles.container}`}>
      {loading && <Loader />}

      {error && (
        <>
          <p className={styles.main__errorTitle}>{error}</p>
          <button className={styles.main__reloadButton} onClick={reload}>
            Reload
          </button>
        </>
      )}

      {!loading && !error && items.length === 0 && (
        <p className={styles.main__errorTitle}>There are no {category}</p>
      )}

      {!loading && !error && (
        <>
          <div className={styles.main__breadcrumbs}>
            <Breadcrumbs />
          </div>

          <h1 className={styles.main__title}>{titles[category]}</h1>
          <span className={styles.main__count}>{products.length} models</span>

          <ProductsFilters
            sort={sort}
            perPage={perPage}
            onSortChange={v => updateParam('sort', v)}
            onPerPageChange={v => updateParam('perPage', v)}
          />

          <div className={styles.main__productsGrid}>
            <ProductsGrid products={items} />
          </div>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={p => updateParam('page', String(p))}
            />
          )}
        </>
      )}
    </div>
  );
};
