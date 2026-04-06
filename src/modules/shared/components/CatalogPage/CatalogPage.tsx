import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList';
import styles from './CatalogPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  category: Category;
  title: string;
};

export const CatalogPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then<Product[]>(res => res.json())
      .then(data => setProducts(data.filter(p => p.category === category)));
  }, [category]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <ProductsList products={products} />
    </div>
  );
};
