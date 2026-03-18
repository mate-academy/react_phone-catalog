import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import {
  catalogTitles,
  itemsOnPageOptions,
  sortByOptions,
} from '../../store/constants';
import { ProductsContext } from '../../store/ProductsProvider';
import { Filter } from '../../types/types';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const { category } = useParams();
  const products = useContext(ProductsContext);
  const items = products.filter(item => item.category === category);

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [itemsOnPage, setItemsOnPage] = useState<number | null>(null);

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

    if (itemsOnPage !== null) {
      return sorted.slice(0, itemsOnPage);
    }

    return sorted;
  };

  const filters: Filter[] = [
    {
      title: 'Sort by',
      value: sortBy,
      onChange: value => setSortBy(value as string | null),
      options: sortByOptions,
      placeholder: 'Maybe newest?',
    },
    {
      title: 'Items on page',
      value: itemsOnPage,
      onChange: value => setItemsOnPage(value as number | null),
      options: itemsOnPageOptions,
    },
  ];

  return (
    <section className={styles.container}>
      <Pagetoolbar
        breadcrumbs
        title={catalogTitles[category ?? ''] ?? 'Catalog'}
        subtitle={`${items.length} models`}
        filters={filters}
      />

      <div className={styles.content}>
        {filteredItems().map(product => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </section>
  );
};
