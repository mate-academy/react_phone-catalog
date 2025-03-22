import { useMemo } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';

import { useProductsContext } from 'contexts/ProductsContext';
import { NotFoundPage } from 'modules/NotFoundPage';
import { EmptyState } from 'shared/components/layout/EmptyState';
import { Error } from 'shared/components/layout/Error';
import { Loader } from 'shared/components/layout/Loader';
import { ProductCard } from 'shared/components/layout/ProductCard';
import { Breadcrumbs } from 'shared/components/ui/Breadcrumbs';
import { ItemsPerPage, itemsPerPage } from 'shared/constants/paginationOptions';
import { categories, ProductCategory } from 'shared/constants/productCategory';
import { SortOptions, sortOptions } from 'shared/constants/sortOptions';
import { capitalize } from 'shared/helpers/capitalize';
import { getProductsBySort } from 'shared/helpers/sorting';
import { updateSearchParams } from 'shared/helpers/urlParams';

import { Dropdown } from './components/Dropdown';
import styles from './ProductsPage.module.scss';

export const ProductsPage: React.FC = () => {
  const { category: selectedCategory } = useParams<{
    category: ProductCategory;
  }>();
  const { productsByCategory, loading, error } = useProductsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam =
    (searchParams.get('sort') as SortOptions) || SortOptions.NEWEST;
  const itemsOnPageParam =
    (searchParams.get('itemsOnPage') as ItemsPerPage) || ItemsPerPage.ALL;

  const handleSortBySelect = (value: string) => {
    updateSearchParams(
      searchParams,
      'sort',
      value,
      SortOptions.NEWEST,
      setSearchParams,
    );
  };

  const handleItemsOnPageSelect = (value: string) => {
    updateSearchParams(
      searchParams,
      'itemsOnPage',
      value,
      ItemsPerPage.ALL,
      setSearchParams,
    );
  };

  const products = useMemo(
    () => (selectedCategory ? productsByCategory[selectedCategory] : []),
    [selectedCategory, productsByCategory],
  );

  const sortedProducts = useMemo(() => {
    return getProductsBySort(products || [], sortParam);
  }, [products, sortParam]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (!categories.includes(selectedCategory as ProductCategory)) {
    return <NotFoundPage />;
  }

  if (!products || products.length === 0) {
    return <EmptyState category={selectedCategory as string} />;
  }

  return (
    <div className={styles.catalogPage}>
      <Breadcrumbs />

      <h1 className={styles.categoryTitle}>
        {selectedCategory ? capitalize(selectedCategory) : 'Category'}
      </h1>

      <span className={styles.numOfProducts}>
        {`${products?.length} models`}
      </span>

      <div className={styles.productsControls}>
        <div className={styles.sortContainer}>
          <Dropdown
            label="Sort by"
            selectedOption={sortParam}
            options={sortOptions}
            onSelect={handleSortBySelect}
          />
        </div>

        <div className={styles.itemOnPageContainer}>
          <Dropdown
            label="Items on page"
            selectedOption={itemsOnPageParam}
            options={itemsPerPage}
            onSelect={handleItemsOnPageSelect}
          />
        </div>
      </div>

      <div className={styles.productsList}>
        {sortedProducts.map(product => (
          <div key={product.id} className={styles.productContainer}>
            <ProductCard product={product} showDiscount={false} />
          </div>
        ))}
      </div>

      <div className={styles.pagination}></div>
    </div>
  );
};
