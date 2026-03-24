import React from 'react';
import styles from './Catalog.module.scss';

import { PageFilter } from '../../components/PageSort';
import { useCatalogSearchParams } from '../../hooks/useCatalogSearchParams';
import { useProducts } from '../../hooks/useProducts';
import { usePagination } from '../../hooks/usePagination';
import { ProductsList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  catalog: 'phones' | 'tablets' | 'accessories';
};

const titles = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Catalog: React.FC<Props> = ({ catalog }) => {
  const { sort, perPage, page, updateParam } = useCatalogSearchParams();
  const { products, loading, error, reload } = useProducts(catalog);
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return a.year - b.year;
    }
  });

  const { items, totalPages } = usePagination(
    sortedProducts,
    page,
    perPage === 'all' ? 'all' : Number(perPage),
  );

  if (error) {
    return (
      <>
        <p>Something went wrong</p>
        <button onClick={reload}>Reload</button>
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!products.length) {
    return <p>There are no {catalog} yet</p>;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__flex}>
        <Breadcrumbs />
        <h1 className={styles.catalog__title}>{titles[catalog]}</h1>
        <span className={styles.catalog__quentites}>
          {products.length} models
        </span>
        <PageFilter
          sort={sort}
          perPage={perPage}
          onSortChange={value => updateParam('sort', value)}
          onPerPageChange={value => updateParam('perPage', value)}
        />
        <ProductsList products={items} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onChange={p => updateParam('page', String(p))}
          />
        )}
      </div>
    </div>
  );
};
