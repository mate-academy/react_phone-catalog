import styles from './ProductsList.module.scss';
import { Products } from '../../types/Products';
import { Loader } from '../components/Loader';
import { ProductNav } from '../ProductNav';
import React from 'react';
import { SortSelector } from './SortSelector/SortSelector';
import { useUpdateSearchParams } from '../hooks/UpdateSearchParams';
import { GridFavourites } from '../components/GridFavourites';
import { Pagination } from './Pagination';

type Props = {
  products: Products[];
  title: string;
  loading: boolean;
  error: string;
};

export const ProductList: React.FC<Props> = ({
  products,
  title,
  loading,
  error,
}) => {
  const { searchParams, updateSearchParams } = useUpdateSearchParams();

  const sortOptions = [
    { name: 'Newset', value: 'age' },
    { name: 'Alphabetically', value: 'title' },
    { name: 'Cheapest', value: 'price' },
  ];

  const sortPerPage = [
    { name: '4', value: '4' },
    { name: '8', value: '8' },
    { name: '16', value: '16' },
    { name: 'All', value: 'all' },
  ];

  const perPage =
    sortPerPage.find(item => item.value === searchParams.get('perPage'))
      ?.value || sortPerPage[0].value;

  const sort = searchParams.get('sort') || sortPerPage[0].value;
  const query = searchParams.get('query');

  const sortItems = (items: Products[]) => {
    let currentItems = items.slice();

    if (query) {
      currentItems = currentItems.filter(a =>
        a.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return currentItems.sort((a, b) => {
      switch (sort) {
        case 'age':
          return b.year - a.year;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  };

  const refinedProducts = sortItems(products);
  const getCurrentPage = () => {
    const page = Number(searchParams.get('page')) || 1;
    const maxPage = Math.ceil(refinedProducts.length / +perPage);

    return page > maxPage ? maxPage : page;
  };

  const currentPage = getCurrentPage();
  const getVisibleProducts = (p: Products[]) => {
    if (perPage === 'all') {
      return p;
    }

    const startIndex = (currentPage - 1) * +perPage;
    const lastIndex =
      currentPage * +perPage > p.length ? p.length : currentPage * +perPage;

    return p.slice(startIndex, lastIndex);
  };

  const visibleProducts = getVisibleProducts(refinedProducts);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles['product-list']}>
      <ProductNav />

      {error ? (
        <p className={styles['product-list__title']}>{error}</p>
      ) : (
        <>
          <div>
            <h1 className={styles['product-list__title']}>{title}</h1>
            <p className={styles['product-list__text']}>
              {refinedProducts.length} models
            </p>
          </div>

          <div>
            <div className={styles['product-list__select']}>
              <SortSelector title="Sort by" items={sortOptions} type="sort" />
              <SortSelector
                title="Items on page"
                items={sortPerPage}
                type="perPage"
              />
            </div>

            {refinedProducts.length ? (
              <GridFavourites products={visibleProducts} />
            ) : (
              <p className={styles['products-catalog__no-found']}>
                No matches found
              </p>
            )}
          </div>
        </>
      )}

      <Pagination
        perPage={perPage}
        total={refinedProducts.length}
        currentPage={currentPage}
        onPageChange={page => updateSearchParams('page', page)}
      />
    </section>
  );
};
