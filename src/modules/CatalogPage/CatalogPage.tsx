import React, { useMemo } from 'react';
import styles from './CatalogPage.module.scss';
import { ProductsType } from '../../types/ProductsType';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { Dropdown } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchLabelsType } from '../../types/SearchLabelsType';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageInfo } from '../../components/PageInfo';
import { useCategoriesRTK } from '../../hooks/useCategoriesRTK';

enum SortByValue {
  Newest = 'year',
  Alphabetically = 'name',
  Cheapest = 'price',
}

type VisibleItemsType = 'All' | '4' | '8' | '16';

interface Props {
  category: ProductsType;
}

export const CatalogPage = ({ category }: Props) => {
  const [searchParams] = useSearchParams();
  const sortOptions = Object.keys(SortByValue) as (keyof typeof SortByValue)[];

  const visibleItemsOptions: VisibleItemsType[] = ['All', '4', '8', '16'];

  const sortParams = searchParams.get('sort');
  const visibleItemsParams = searchParams.get('perPage');
  const activePageParams = searchParams.get('page');

  const sortBy = useMemo(
    () =>
      sortParams === null
        ? SortByValue[sortOptions[0]]
        : SortByValue[sortParams as keyof typeof SortByValue],
    [sortParams, sortOptions],
  );

  const visibleItems =
    visibleItemsParams === null ? 'All' : +visibleItemsParams;

  const activePage = activePageParams === null ? 1 : +activePageParams;

  const {
    categorie: products,
    loading,
    error,
  } = useCategoriesRTK(ProductsType.Products);

  const filteredProducts = useMemo(() => {
    return [...products].filter(product => product.category === category);
  }, [category, products]);

  const currentProducts = useMemo(() => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case SortByValue.Alphabetically:
          return a[sortBy].localeCompare(b[sortBy]);
        case SortByValue.Cheapest:
          return a[sortBy] - b[sortBy];
        default:
          return b[sortBy] - a[sortBy];
      }
    });

    if (visibleItems === 'All') {
      return sortedProducts;
    }

    const start = visibleItems * (activePage - 1);
    const end = start + visibleItems;

    return sortedProducts.slice(start, end);
  }, [filteredProducts, visibleItems, activePage, sortBy]);

  return (
    <section className={`section ${styles.catalog}`}>
      <div className="container">
        <Breadcrumbs />
        <PageInfo title="Mobile phones" count={filteredProducts.length} />
        <div className={styles.catalog__dropdowns}>
          <Dropdown
            className={styles['catalog__dropdowns-sort-by']}
            title={'Sort by'}
            values={sortOptions}
            defaultValue={sortOptions[0]}
            searchLabel={SearchLabelsType.Sort}
          />

          <Dropdown
            className={styles['catalog__dropdowns-items-per-page']}
            title={'Items per page'}
            values={visibleItemsOptions}
            defaultValue={visibleItemsOptions[0]}
            searchLabel={SearchLabelsType.ItemsPerPage}
          />
        </div>
        <div className={styles.catalog__cards}>
          {loading ? (
            <Loader />
          ) : error ? (
            'error'
          ) : (
            <ProductsList products={currentProducts} />
          )}
        </div>

        {!loading && visibleItems !== 'All' && (
          <div className={styles.catalog__pagination}>
            <Pagination
              items={filteredProducts.length}
              itemsOnPage={visibleItems}
              activePage={activePage}
              searchLabel={SearchLabelsType.PageCatalog}
            />
          </div>
        )}
      </div>
    </section>
  );
};
