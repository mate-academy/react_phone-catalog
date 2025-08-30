// src/modules/home/HomePage.tsx - Home page component
import { useEffect, useMemo } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { api } from '../../api';
import { useAsync } from '../catalog/hooks/useAsync';
import { Product } from '../../types';

const HERO_IMAGES = [
  './public/img/banner-accessories.png',
  './public/img/banner-phones.png',
  './public/img/banner-tablets.png',
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

      <section style={{ marginTop: 32 }}>
        <ProductsSlider title="Hot prices" products={hot} />
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Shop by category</h2>
        <ul>
          <li>
            <a href="/phones">Phones</a>
          </li>
          <li>
            <a href="/tablets">Tablets</a>
          </li>
          <li>
            <a href="/accessories">Accessories</a>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 32 }}>
        <ProductsSlider title="Brand new" products={newest} />
      </section>
    </div>
  );
};
