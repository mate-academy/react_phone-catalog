import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../shared/components/ProductsSlider/ProductsSlider';
import { getProducts } from '../../api/Products';
import { Product } from '../../types/Product';
import { Categories } from './components/Categories/Categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const hotPrices = useMemo(() => {
    return [...products]
      .filter(p => p.price < p.fullPrice)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const brandNew = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year || b.price - a.price);
  }, [products]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Product Catalog</h1>

      <h1 className={styles.heading}>Welcome to Nice Gadgets store!</h1>

      <section className={styles.section}>
        <PicturesSlider />
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </section>

      <section className={styles.section}>
        <Categories products={products} />
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Brand new models" products={brandNew} />
      </section>
    </div>
  );
};
