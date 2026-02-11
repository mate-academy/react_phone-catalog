import React from 'react';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';

import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

export function ProductList({ category }: Props) {
  const dataMap: Record<Props['category'], any[]> = {
    phones: phones as any[],
    tablets: tablets as any[],
    accessories: accessories as any[],
  };

  const products = dataMap[category];

  if (!products.length) {
    return <p>There are no products yet.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
