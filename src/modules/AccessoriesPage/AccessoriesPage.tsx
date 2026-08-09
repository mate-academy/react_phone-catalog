/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getProducts } from '../../api/products';
import { CatalogFilters } from '../../components/CatalogFilters';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { ProductsGrid } from '../../components/ProductsGrid';
import { Product } from '../../types/Product';

import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const query = searchParams.get('query') || '';

  const sort =
    searchParams.get('sort') || 'newest';

  const itemsPerPageParam =
    searchParams.get('perPage') || '16';

  const itemsPerPage =
    itemsPerPageParam === 'all'
      ? 0
      : Number(itemsPerPageParam);

  const currentPage =
    Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(products => {
        setAccessories(
          products.filter(
            product => product.category === 'accessories',
          ),
        );
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateParams = (
    changes: Record<string, string | null>,
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(
      ([key, value]) => {
        if (
          value === null ||
          value === '' ||
          (key === 'sort' && value === 'newest') ||
          (key === 'page' && value === '1') ||
          (key === 'perPage' && value === 'all')
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      },
    );

    setSearchParams(params);
  };

  const filteredAccessories = accessories.filter(
    accessory =>
      accessory.name
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  const sortedAccessories = [
    ...filteredAccessories,
  ].sort((a, b) => {
    if (sort === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sort === 'cheapest') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  const totalPages =
    itemsPerPage === 0
      ? 1
      : Math.ceil(
          sortedAccessories.length / itemsPerPage,
        );

  const safePage =
    currentPage > totalPages && totalPages > 0
      ? totalPages
      : currentPage;

  const visibleAccessories =
    itemsPerPage === 0
      ? sortedAccessories
      : sortedAccessories.slice(
          (safePage - 1) * itemsPerPage,
          safePage * itemsPerPage,
        );

  const handleQueryChange = (value: string) => {
    updateParams({
      query: value,
      page: '1',
    });
  };

  const handleSortChange = (value: string) => {
    updateParams({
      sort: value,
      page: '1',
    });
  };

  const handleItemsPerPageChange = (
    value: number,
  ) => {
    updateParams({
      perPage:
        value === 0 ? 'all' : String(value),
      page: '1',
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({
      page: String(page),
    });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (hasError) {
    return (
      <section className={styles.accessoriesPage}>
        <h2>Something went wrong</h2>

        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </section>
    );
  }

  return (
    <section className={styles.accessoriesPage}>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Accessories' },
        ]}
      />

      <h1 className={styles.title}>
        Accessories
      </h1>

      <p className={styles.count}>
        {filteredAccessories.length} models
      </p>

      <CatalogFilters
        sort={sort}
        itemsPerPage={itemsPerPage}
        query={query}
        onSortChange={handleSortChange}
        onItemsPerPageChange={
          handleItemsPerPageChange
        }
        onQueryChange={handleQueryChange}
      />

      {filteredAccessories.length === 0 ? (
        <p>
          {query
            ? 'There are no accessories matching the query'
            : 'There are no accessories yet'}
        </p>
      ) : (
        <>
          <ProductsGrid
            products={visibleAccessories}
          />

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};
