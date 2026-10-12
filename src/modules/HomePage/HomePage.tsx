import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProducts } from '../../shared/data/api';
import type { Product } from '../../shared/types';
import styles from './HomePage.module.scss';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const hot = [...products]
    .filter(product => (product.fullPrice ?? product.price) > product.price)
    .sort(
      (a, b) =>
        (b.fullPrice ?? b.price) -
        b.price -
        ((a.fullPrice ?? a.price) - a.price),
    );

  const newest = [...products].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const count = (category: string) =>
    products.filter(product => product.category === category).length;

  return (
    <div className={styles.page}>
      <h1>Product Catalog</h1>
      <PicturesSlider />
      <ProductsSlider title="Brand new" products={newest} />
      <section className={styles.categories}>
        <h2>Shop by category</h2>
        <div className={styles.categoryGrid}>
          <Link to="/phones">
            <img src="img/category-phones.webp" alt="" />
            <b>Mobile phones</b>
            <small>{count('phones')} models</small>
          </Link>
          <Link to="/tablets">
            <img src="img/category-tablets.webp" alt="" />
            <b>Tablets</b>
            <small>{count('tablets')} models</small>
          </Link>
          <Link to="/accessories">
            <img src="img/category-accessories.webp" alt="" />
            <b>Accessories</b>
            <small>{count('accessories')} models</small>
          </Link>
        </div>
      </section>
      <ProductsSlider title="Hot prices" products={hot} />
    </div>
  );
}
