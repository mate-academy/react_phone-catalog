// src/modules/home/HomePage.tsx - Home page component
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { api } from '../../api';
import { useAsync } from '../catalog/hooks/useAsync';
import { Product } from '../../types';
import styles from './HomePage.module.scss';

const HERO_IMAGES = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Product Catalog';
  }, []);
  const { data: phones, run } = useAsync<Product[]>();

  useEffect(() => {
    run(api.getProducts('phones'));
  }, [run]);

  const hot = useMemo(() => {
    if (!phones) {
      return [];
    }

    return [...phones]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 12);
  }, [phones]);

  const newest = useMemo(() => {
    if (!phones) {
      return [];
    }

    return [...phones].sort((a, b) => b.year - a.year).slice(0, 12);
  }, [phones]);

  return (
    <div>
      <h1 className="visually-hidden">Product Catalog</h1>

      <PicturesSlider images={HERO_IMAGES} />

      <section className={styles.section}>
        <ProductsSlider title="Hot prices" products={hot} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Shop by category</h2>
        <ul className={styles.categories}>
          <li>
            <Link to="/phones" className={styles.categoryLink}>
              <img
                src="/img/category-phones.webp"
                alt="Phones"
                className={styles.categoryImage}
              />
              Phones
            </Link>
          </li>
          <li>
            <Link to="/tablets" className={styles.categoryLink}>
              <img
                src="/img/category-tablets.webp"
                alt="Tablets"
                className={styles.categoryImage}
              />
              Tablets
            </Link>
          </li>
          <li>
            <Link to="/accessories" className={styles.categoryLink}>
              <img
                src="/img/category-accessories.webp"
                alt="Accessories"
                className={styles.categoryImage}
              />
              Accessories
            </Link>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Brand new" products={newest} />
      </section>
    </div>
  );
};
