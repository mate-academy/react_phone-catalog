import styles from './CardPage.module.scss';
import { useMemo } from 'react';
import { useTabs } from '../../ProductsContext/TabsContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { useFavourite } from '../../ProductsContext/FavouriteContext';
import { Cart } from '../Cart/Cart';
import { CardProduct, NavigateList } from '../shared';
import { SortBy } from './components/SortBy';
import { Loader } from '../shared/components/Loader';
import { Error } from '../shared/components/Error';
import { NoCategory } from '../shared/components/NoCategory';

export const CardPage = () => {
  const { productsList, loading, error } = useTabs();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favourites } = useFavourite();

  const favouritesProducts = productsList.filter(product =>
    favourites.includes(product.id),
  );
  const categoryFavourite = category === 'favourites';
  const categoryCart = category === 'cart';

  const pageParam = Number(searchParams.get('page') || 1);
  const perPageParam = searchParams.get('perPage') || 'all';
  const sortByParam = searchParams.get('sortBy') || 'Newest';

  const sortOptions = ['Newest', 'Alphabetically', 'Cheapest'];
  const items = ['4', '8', '16', 'all'];

  const productsFilters = useMemo(
    () => productsList.filter(product => product.category === category),
    [productsList, category],
  );

  const updateParams = (newParams: Record<string, string>) => {
    const updated = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });

    setSearchParams(updated);
  };

  const elementsSorted = [
    {
      title: 'Sort by',
      sortBy: sortByParam,
      option: sortOptions,
      onChange: (newValue: string) =>
        updateParams({ sortBy: newValue, page: '1' }),
    },
    {
      title: 'Items on page',
      sortBy: perPageParam,
      option: items,
      onChange: (newValue: string) =>
        updateParams({ page: '1', perPage: newValue }),
    },
  ];

  const sortedProducts = useMemo(() => {
    const copy = [...productsFilters];

    switch (sortByParam) {
      case 'Newest':
        return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      case 'Alphabetically':
        return copy.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
      case 'Cheapest':
        return copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      default:
        return copy;
    }
  }, [productsFilters, sortByParam]);

  const perPage =
    perPageParam === 'all' ? sortedProducts.length : Number(perPageParam);

  const totalPage =
    perPage === sortedProducts.length
      ? 1
      : Math.ceil(sortedProducts.length / perPage);

  const start = (pageParam - 1) * perPage;

  const visibleProducts = useMemo(() => {
    if (categoryFavourite) {
      return productsList.filter(product => favourites.includes(product.id));
    }

    return perPageParam === 'all'
      ? sortedProducts
      : sortedProducts.slice(start, start + perPage);
  }, [
    categoryFavourite,
    productsList,
    favourites,
    sortedProducts,
    start,
    perPage,
    perPageParam,
  ]);

  const titleCategory = (() => {
    switch (category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      case 'favourites':
        return 'Favourites';
      case 'cart':
        return 'Cart';
      default:
        return '';
    }
  })();

  const visibilityPagination =
    !categoryFavourite && !categoryCart && perPageParam !== 'all';

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!productsList || productsList.length === 0) {
    return <NoCategory category={category} />;
  }

  return (
    <div className={styles.container}>
      <NavigateList />
      <h1 className={styles.title}>{titleCategory}</h1>

      {!categoryCart && (
        <div className={styles.countModels}>
          {categoryFavourite
            ? favouritesProducts.length
            : sortedProducts.length}
          &nbsp;models
        </div>
      )}

      <div className={styles.box}>
        {!categoryFavourite && !categoryCart && (
          <div className={styles.sortGrid}>
            {elementsSorted.map((el, i) => (
              <SortBy
                key={i}
                title={el.title}
                sortBy={el.sortBy}
                sortOptions={el.option}
                onChange={el.onChange}
              />
            ))}
          </div>
        )}

        {categoryCart ? (
          <Cart />
        ) : (
          <div className={styles.elementsContainer}>
            {visibleProducts.map(product => {
              const sale =
                product.details?.priceDiscount !==
                product.details?.priceRegular;

              return (
                <CardProduct key={product.id} element={product} sale={sale} />
              );
            })}
          </div>
        )}
      </div>

      {visibilityPagination && (
        <Pagination
          totalPage={totalPage}
          currentPage={pageParam}
          onPageChange={newPage =>
            updateParams({ page: String(newPage), perPage: perPageParam })
          }
        />
      )}
    </div>
  );
};
