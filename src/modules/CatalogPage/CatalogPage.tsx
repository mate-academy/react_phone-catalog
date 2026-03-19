import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/api';
import { ProductList } from '@/modules/shared/components/ProductList';
import { Pagination } from '@/modules/shared/components/Pagination';
import { Heading } from '@/components/ui/Heading';
import { Loader } from '@/components/Loader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import styles from './CatalogPage.module.scss';
import { CatalogFilters } from '@/modules/shared/components/CatalogFilter';

const categoryNames: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, [category]);

  //ODCZYT Z URL
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  // --- 2. LOGIKA SORTOWANIA ---
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  // ---  LOGIKA PAGINACJI ---
  const isAll = perPage === 'all';
  const itemsPerPage = isAll ? sortedProducts.length : Number(perPage);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

  // --- Funkcja aktualizująca URL
  const updateParams = (newValues: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newValues).forEach(([key, value]) => {
      if (
        (key === 'sort' && value === 'age') ||
        (key === 'perPage' && value === 'all') ||
        (key === 'page' && value === 1)
      ) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });
    if (!newValues.hasOwnProperty('page')) {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const shouldShowPagination = !isAll && sortedProducts.length > itemsPerPage;

  //--- pobieranie nagłówka z kategorii
  const displayTitle = category
    ? categoryNames[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    : 'Catalog';

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <Breadcrumbs category={displayTitle} />

        <Heading as="h1" className={styles.catalog__title}>
          {displayTitle}
        </Heading>
        <p className={styles.catalog__count}>{products.length} models</p>

        <CatalogFilters
          sort={sort}
          perPage={perPage}
          onSortChange={val => updateParams({ sort: val })}
          onPerPageChange={val => updateParams({ perPage: val })}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ProductList products={currentProducts} />

            {shouldShowPagination && (
              <Pagination
                total={sortedProducts.length}
                perPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={newPage => {
                  updateParams({ page: newPage });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
