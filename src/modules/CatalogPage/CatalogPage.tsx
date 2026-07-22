import { Product } from '../shared/types/Product';
import { FC, useCallback, useEffect, useState } from 'react';
import { getProductsByCategory } from '../../services/product';
import styles from './CatalogPage.module.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../shared/components/Pagination';
import { usePagination } from '../shared/hooks/usePagination';
import { Dropdown, DropdownOption } from '../shared/components/Dropdown';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { ProductCategory } from '../shared/types/ProductCategory';
import { ProductsList } from '../shared/components/ProductsList';
import { ErrorMessage } from '../shared/components/ErrorMessage';

const sortOptions: DropdownOption<string>[] = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
];

const perPageOptions: DropdownOption<string>[] = [
  { label: 'All', value: 'all' },
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
];

type Props = {
  category: ProductCategory;
  title: string;
  breadcrumbLabel: string;
};

export const CatalogPage: FC<Props> = ({
  category,
  title,
  breadcrumbLabel,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';

  const sortedProducts = [...products].sort((product1, product2) => {
    switch (sort) {
      case 'title':
        return product1.name.localeCompare(product2.name);

      case 'price':
        return product1.price - product2.price;

      case 'age':
      default:
        return product2.year - product1.year;
    }
  });

  const productsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const isPaginationReady = !isLoading && !error && products.length > 0;

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    visiblePages,
    handlePageChange,
  } = usePagination({
    totalItems: sortedProducts.length,
    itemsPerPage: productsPerPage,
    enabled: isPaginationReady,
  });

  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', newSort);
    params.delete('page');
    setSearchParams(params);
  };

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams);

    if (newItemsPerPage === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', newItemsPerPage);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);

      const productsFromServer = await getProductsByCategory(category);

      setProducts(productsFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  const hasNoProducts = !isLoading && !error && products.length === 0;
  const hasProducts = !isLoading && !error && products.length > 0;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className={classNames('container', styles.catalog)}>
      <div>
        <Breadcrumb items={[{ label: breadcrumbLabel }]} />
      </div>

      <div className={styles.catalog__heading}>
        <h1>{title}</h1>
        {!isLoading && !error && (
          <p className={styles.catalog__totalModels}>
            {products.length} models
          </p>
        )}
      </div>

      {isLoading && (
        <div className={styles.catalog__state}>
          <span
            className={classNames('loader', styles.catalog__loader)}
            aria-hidden="true"
          />
        </div>
      )}

      {!isLoading && error && <ErrorMessage onRetry={loadProducts} />}

      {hasNoProducts && (
        <div className={styles.catalog__state}>
          <p className={styles.catalog__emptyMessage}>
            There are no {category} yet
          </p>
        </div>
      )}

      {hasProducts && (
        <>
          <div className={styles.catalog__content}>
            <div className={styles.catalog__controls}>
              <div className={styles.catalog__sortBy}>
                <Dropdown
                  label="Sort by"
                  value={sort}
                  options={sortOptions}
                  onChange={handleSortChange}
                />
              </div>

              <div className={styles.catalog__itemsOnPage}>
                <Dropdown
                  label="Items on page"
                  value={perPage}
                  options={perPageOptions}
                  onChange={handleItemsPerPageChange}
                />
              </div>
            </div>

            <ProductsList products={visibleProducts} />
          </div>

          {perPage !== 'all' && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              visiblePages={visiblePages}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
