import React from 'react';
import styles from './ProductFilter.module.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  updateFilter: (value: string) => void;
  updateQuantity: (value: string) => void;
};

export const ProductFilter: React.FC<Props> = ({
  updateFilter,
  updateQuantity,
}) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('filter') || '';
  const quantity = searchParams.get('quantity') || 12;

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <label htmlFor="filter">Sort by</label>
        <select
          className={styles.option1}
          value={category}
          onChange={e => updateFilter(e.target.value)}
        >
          <option value=""></option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className={styles.filter}>
        <label htmlFor="quantity">Items on page</label>
        <select
          className={styles.option2}
          value={quantity}
          onChange={e => updateQuantity(e.target.value)}
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={24}>24</option>
        </select>
      </div>
    </div>
  );
};
