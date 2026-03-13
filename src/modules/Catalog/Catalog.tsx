import { useContext } from 'react';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import { ProductsContext } from '../../store/ProductsProvider';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const products = useContext(ProductsContext);
  const phones = products.filter(item => item.category === 'phones');

  const filters = [
    {
      title: 'Sort by',
      list: ['Newest', 'Capacity', 'Ram', 'Price'],
    },
    {
      title: 'Items on page',
      list: [8, 16, 32, 64],
    },
  ];

  return (
    <div className={styles.container}>
      <Pagetoolbar
        path="Phones"
        title="Mobile phones"
        subtitle="95 modules"
        filters={filters}
      />

      <div className={styles.content}>
        {phones.map(product => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};
