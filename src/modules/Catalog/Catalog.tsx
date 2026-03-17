import { useState } from 'react';
import { useContext } from 'react';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import { ProductsContext } from '../../store/ProductsProvider';
import { Filter } from '../../types/types';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const products = useContext(ProductsContext);
  const phones = products.filter(item => item.category === 'phones');

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [itemsOnPage, setItemsOnPage] = useState<number | null>(null);

  const sortByOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Capacity', value: 'capacity' },
    { label: 'Ram', value: 'ram' },
    { label: 'Price', value: 'price' },
  ];

  const itemsOnPageOptions = [
    { label: '8', value: 8 },
    { label: '16', value: 16 },
    { label: '32', value: 32 },
    { label: '64', value: 64 },
  ];

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
        title="Mobile phones"
        subtitle={`${phones.length} models`}
        filters={filters}
      />

      <div className={styles.content}>
        {phones.map(product => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </section>
  );
};
