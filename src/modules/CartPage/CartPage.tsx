import styles from './CartPage.module.scss';
import { NavigateList } from '../shared/components/NavigateList/NavigateList';
import { useMemo, useState } from 'react';
import { useTabs } from '../../ProductsContext/TabsContext';
import { CardProduct } from '../shared/components/CardProduct';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { SortBy } from './components/SortBy';
import { ItemsOnPage } from './components/ItemsOnPage';

export const CartPage = () => {
  const { productsList } = useTabs();
  const { category } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page') || 1);
  const perPageParam = searchParams.get('perPage') || 'all';

  const [sortOpen, setSortOpen] = useState(false);
  const sortOptions = ['Newest', 'Alphabetically', 'Cheapest'];
  const [sortBy, setSortBy] = useState('Newest');

  const items = ['4', '8', '16', 'all'];

  const productsFilters = useMemo(
    () => productsList.filter(product => product.category === category),
    [productsList, category],
  );

  switch (sortBy) {
    case 'Newest':
      productsFilters.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      break;

    case 'Alphabetically':
      productsFilters.sort((a, b) =>
        (a.name ?? '').localeCompare(b.name ?? ''),
      );
      break;

    case 'Cheapest':
      productsFilters.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;

    default:
      break;
  }

  const perPage =
    perPageParam === 'all' ? productsFilters.length : Number(perPageParam);

  const totalPage =
    perPage === productsFilters.length
      ? 1
      : Math.ceil(productsFilters.length / perPage);

  const start = (pageParam - 1) * perPage;

  const visibleProducts =
    perPageParam === 'all'
      ? productsFilters
      : productsFilters.slice(start, start + perPage);

  const updateParams = (page: number, perPageItems: string | number) => {
    const params: Record<string, string> = {};

    if (page > 1) {
      params.page = String(page);
    }

    if (
      perPageItems !== 'all' &&
      Number(perPageItems !== productsFilters.length)
    ) {
      params.perPage = String(perPage);
    }

    setSearchParams(params);
  };

  const titleCategory = (() => {
    switch (category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return '';
    }
  })();

  return (
    <div className={styles.container}>
      <NavigateList />
      <h1 className={styles.title}>{titleCategory}</h1>

      <div className={styles.countModels}>{productsFilters.length} models</div>

      <div className={styles.box}>
        <div className={styles.sortGrid}>
          <SortBy
            sortBy={sortBy}
            setSortOpen={setSortOpen}
            sortOpen={sortOpen}
            sortOptions={sortOptions}
            setSortBy={setSortBy}
          />

          <ItemsOnPage
            current={perPage}
            items={items}
            onChange={newPerPage => updateParams(1, newPerPage)}
          />
        </div>

        <div className={styles.elementsContainer}>
          {visibleProducts.map(product => (
            <CardProduct key={product.id} element={product} sale={true} />
          ))}
        </div>
      </div>

      <Pagination
        totalPage={totalPage}
        currentPage={pageParam}
        onPageChange={newPerPage => updateParams(1, newPerPage)}
      />
    </div>
  );
};
