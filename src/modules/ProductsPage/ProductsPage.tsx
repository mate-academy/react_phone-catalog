import { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useProducts } from '../shared/context/ProductsContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Category } from '../shared/types/Category';
import { ProductsList } from '../shared/components/ProductList';
import { DropDown } from '../shared/components/DropDown/DropDown';
import { Pagination } from '../shared/components/Pagination';
import { Loader } from '../shared/components/Loader';
import { PageState } from '../shared/components/PageState';

import styles from './ProductsPage.module.scss';

type Props = {
  category: Category;
};

const categoryTitles: Record<Category, { title: string; breadcrumb: string }> =
  {
    phones: { title: 'Mobile phones', breadcrumb: 'Phones' },
    tablets: { title: 'Tablets', breadcrumb: 'Tablets' },
    accessories: { title: 'Accessories', breadcrumb: 'Accessories' },
  };

export const ProductsPage: FC<Props> = ({ category }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') ?? 'age';
  const perPageParam = searchParams.get('perPage');
  const pageParam = Number(searchParams.get('page')) || 1;

  const query = searchParams.get('query')?.toLowerCase() || '';

  const perPage =
    !perPageParam || perPageParam === 'all' ? null : Number(perPageParam);

  const currentPage = Math.max(1, pageParam);

  const { products, error } = useProducts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [category, products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => product.category === category);

    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query),
      );
    }

    if (sort) {
      switch (sort) {
        case 'age':
          filtered = [...filtered].sort((p1, p2) => p2.year - p1.year);
          break;
        case 'price':
          filtered = [...filtered].sort((p1, p2) => p1.price - p2.price);
          break;
        case 'title':
          filtered = [...filtered].sort((p1, p2) =>
            p1.name.localeCompare(p2.name),
          );
          break;
      }
    }

    return filtered;
  }, [products, category, sort, query]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <PageState type="error" message="Something went wrong" />;
  }

  if (filteredAndSortedProducts.length === 0) {
    if (query) {
      return (
        <PageState
          type="empty"
          message={`
            There are no
            ${categoryTitles[category].breadcrumb.toLowerCase()}
            matching the query
          `}
        />
      );
    }

    return (
      <PageState
        type="empty"
        message={`
          There are no ${categoryTitles[category].breadcrumb.toLowerCase()} yet
        `}
      />
    );
  }

  const startIndex = perPage ? (currentPage - 1) * perPage : 0;
  const endIndex = perPage
    ? startIndex + perPage
    : filteredAndSortedProducts.length;
  const currentItems = filteredAndSortedProducts.slice(startIndex, endIndex);

  return (
    <section className={styles.products}>
      <div className={styles.products__wrapper}>
        <Breadcrumbs
          firstPath={categoryTitles[category].breadcrumb}
          secondPath=""
        />

        <h1 className={styles.products__header}>
          {categoryTitles[category].title}
        </h1>

        <p className={styles.products__count}>
          {currentItems.length} model{currentItems.length !== 1 && 's'}
        </p>

        <div className={styles['products__drop-downs']}>
          <div
            className={`${styles['products__drop-down']}
              ${styles['products__drop-down--sort-by']}`}
          >
            <DropDown
              label="Sort by"
              paramKey="sort"
              defaultValue="age"
              options={[
                { value: 'age', label: 'Newest' },
                { value: 'title', label: 'Alphabetically' },
                { value: 'price', label: 'Cheapest' },
              ]}
            />
          </div>

          <div
            className={`${styles['products__drop-down']}
              ${styles['products__drop-down--items-per-page']}`}
          >
            <DropDown
              label="Items on page"
              paramKey="perPage"
              defaultValue="all"
              options={[
                { value: 'all', label: 'All' },
                { value: '4', label: '4' },
                { value: '8', label: '8' },
                { value: '16', label: '16' },
              ]}
            />
          </div>
        </div>

        <ProductsList products={currentItems} />

        {perPage && filteredAndSortedProducts.length > perPage && (
          <Pagination
            total={filteredAndSortedProducts.length}
            perPage={perPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </section>
  );
};
