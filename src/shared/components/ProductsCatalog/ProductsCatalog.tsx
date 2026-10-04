import container from '@/shared/styles/Container.module.scss';
import grid from '@/shared/styles/GridLayout.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '@/shared/types/Product';
import styles from './ProductsCatalog.module.scss';
import { sortProducts } from '@/shared/utils/sortProducts';
import { useSearchParams } from 'react-router-dom';
import { Category } from '@/shared/api/Category';
import { Breadcrumbs } from '../Breadcrumbs';
import { Pagination } from '../Pagination';
import { useTranslation } from 'react-i18next';

import { ProductsSkeleton } from '../ProductsSkeleton';

type Props = {
  title: string;
  products: Product[];
  category: Category;
  isLoading: boolean;
};

export const ProductsCatalog: React.FC<Props> = ({
  title,
  products,
  category,
  isLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const query = searchParams.get('query') || '';

  const sort = searchParams.get('sort') || 'newest';

  const perPageParam = searchParams.get('perPage');

  const { t } = useTranslation();

  const itemsPerPage =
    perPageParam === null || perPageParam === 'all' ? 0 : Number(perPageParam);

  const updateParams = (page: number, sortValue: string, perPage: number) => {
    const params: Record<string, string> = {};

    if (page !== 1) {
      params.page = String(page);
    }

    if (sortValue !== 'newest') {
      params.sort = sort;
    }

    if (perPage !== 0) {
      params.perPage = String(perPage);
    }

    if (query) {
      params.query = query;
    }

    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    updateParams(1, value, itemsPerPage);
  };

  const handleItemsPerPageChange = (value: number) => {
    updateParams(1, sort, value);
  };

  const handlePageChange = (page: number) => {
    updateParams(page, sort, itemsPerPage);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const availableProducts = filteredProducts.length;

  const sortedProducts = sortProducts(filteredProducts, sort);

  const visibleProducts =
    itemsPerPage === 0
      ? sortedProducts
      : sortedProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  const totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  const BreadcrumbsTitle = `header.${category}`;

  const modelsOrModel = availableProducts === 1 ? 'model' : 'models';

  return (
    <section className={styles.catalog}>
      <div className={container.container}>
        <Breadcrumbs title={BreadcrumbsTitle} />
        <h1 className={styles.title}>{t(`products.${title}`)}</h1>
        <div className={styles.availableModels}>
          {availableProducts} {modelsOrModel}
        </div>
        <div className={styles.productsControls}>
          <div className={styles.itemsControl}>
            <label className={styles.label} htmlFor="sort">
              {t('products.sortBy')}
            </label>

            <div className={styles.selectWrapper}>
              <select
                id="sort"
                className={styles.filterSelect}
                value={sort}
                onChange={e => handleSortChange(e.target.value)}
              >
                <option value="newest">{t('products.sortedBy.newest')}</option>

                <option value="alphabetically">
                  {t('products.sortedBy.alphabetically')}
                </option>

                <option value="cheapest">
                  {t('products.sortedBy.cheapest')}
                </option>
              </select>

              <img src="icons/down.svg" alt="options" />
            </div>
          </div>

          <div className={styles.itemsControl}>
            <label
              className={`${styles.label} ${styles.onPage}`}
              htmlFor="items"
            >
              {t('products.itemsOnPage')}
            </label>

            <div className={styles.selectWrapper}>
              <select
                id="items"
                className={styles.pagesSelect}
                value={itemsPerPage}
                onChange={e => handleItemsPerPageChange(Number(e.target.value))}
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={0}> {t('products.itemsOnPageAll')}</option>
              </select>

              <img src="icons/down.svg" alt="options" />
            </div>
          </div>
        </div>
        {isLoading ? (
          <ProductsSkeleton />
        ) : !products.length ? (
          <p className={styles.emptyMessage}>There are no {title} yet</p>
        ) : !filteredProducts.length ? (
          <p className={styles.emptyMessage}>
            {t('products.noMatchingQuery', { title })}
          </p>
        ) : (
          <>
            <div
              key={`${currentPage}-${itemsPerPage}-${sort}`}
              className={`${grid.grid} ${styles.productsGrid}`}
            >
              {visibleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
