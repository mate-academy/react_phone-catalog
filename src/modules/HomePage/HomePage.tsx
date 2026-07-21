import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import type { Product } from '../../types/Product';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';

const banners = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide(current => (current + 1) % banners.length),
      5000,
    );

    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true));
  }, []);
  const hotPrices = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 8),
    [products],
  );
  const brandNew = useMemo(
    () => [...products].sort((a, b) => b.year - a.year).slice(0, 8),
    [products],
  );

  return (
    <section className="page home">
      <h1 className="visually-hidden">Product Catalog</h1>
      <div className="slider">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() =>
            setActiveSlide(
              current => (current - 1 + banners.length) % banners.length,
            )
          }
        >
          ‹
        </button>
        <img src={banners[activeSlide]} alt="Promotion" />
        <button
          type="button"
          aria-label="Next slide"
          onClick={() =>
            setActiveSlide(current => (current + 1) % banners.length)
          }
        >
          ›
        </button>
        <div className="dots">
          {banners.map((banner, index) => (
            <button
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={index === activeSlide ? 'active' : ''}
              key={banner}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
      <section>
        <h2>Hot prices</h2>
        {error ? (
          <p>Something went wrong</p>
        ) : products.length ? (
          <ProductsList products={hotPrices} />
        ) : (
          <Loader />
        )}
      </section>
      <section>
        <h2>Shop by category</h2>
        <div className="categories">
          {(['phones', 'tablets', 'accessories'] as const).map(category => (
            <Link to={`/${category}`} key={category}>
              <img src={`img/category-${category}.png`} alt={category} />
              <h3>{category[0].toUpperCase() + category.slice(1)}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2>Brand new</h2>
        {products.length ? (
          <ProductsList products={brandNew} />
        ) : (
          !error && <Loader />
        )}
      </section>
    </section>
  );
};
