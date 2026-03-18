import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import { Pagination } from '../../components/ui/Pagination';
import {
  catalogTitles,
  itemsOnPageOptions,
  sortByOptions,
} from '../../store/constants';
import { ProductsContext } from '../../store/ProductsProvider';
import { Filter, FilterParams, FilterValue } from '../../types/types';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const { category } = useParams();
  const products = useContext(ProductsContext);
  const items = products.filter(item => item.category === category);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || null;
  const perPage = searchParams.get('perPage') || null;
  const page = searchParams.get('page') || null;

  const start = (Number(page) - 1) * Number(perPage);
  const end = Math.min(start + Number(perPage), items.length);

  const handleSorting = (value: FilterValue, filter: FilterParams) => {
    const params = new URLSearchParams(searchParams);

    if (value === null) {
      params.delete(filter);
    } else {
      params.set(filter, String(value));
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filters: Filter[] = [
    {
      title: 'Sort by',
      value: sortBy,
      onChange: value => handleSorting(value, 'sort'),
      options: sortByOptions,
      placeholder: 'Maybe newest?',
    },
    {
      title: 'Items on page',
      value: perPage,
      onChange: value => handleSorting(value, 'perPage'),
      options: itemsOnPageOptions,
    },
  ];

  const filteredItems = () => {
    const sorted = [...items];

    switch (sortBy) {
      case 'year':
        sorted.sort((a, b) => b.year - a.year);

        break;
      case 'alph':
        sorted.sort((a, b) => a.name.localeCompare(b.name));

        break;
      case 'price':
        sorted.sort((a, b) => b.price - a.price);

        break;
      default:
        break;
    }

    if (perPage !== null && page !== null) {
      return sorted.slice(start, end);
    }

    return sorted;
  };

  return (
    <section className={styles.container}>
      <Pagetoolbar
        breadcrumbs
        title={catalogTitles[category ?? ''] ?? 'Catalog'}
        subtitle={`${items.length} models`}
        filters={filters}
        clearFilters={clearFilters}
      />

      <div className={styles.content}>
        {filteredItems().map(product => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>

      {perPage !== null && (
        <div className={styles.footer}>
          <Pagination itemsAmount={items.length} />
        </div>
      )}
    </section>
  );
};
