import { useEffect, useRef, useState } from 'react';

import { getProducts } from '../../../../services/products';
import type { Product } from '../../../../types';
import { ProductCard } from '../../../shared/components/ProductCard';

import styles from './BrandNewModels.module.scss';

export const BrandNewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts()
      .then(data => {
        const newestProducts = [...data]
          .sort((a, b) => b.year - a.year)
          .slice(0, 12);

        setProducts(newestProducts);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const scrollProducts = (direction: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const card = slider.firstElementChild as HTMLElement | null;

    if (!card) {
      return;
    }

    const gap = 16;
    const distance = card.offsetWidth + gap;

    slider.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (hasError) {
    return <p>Unable to load products.</p>;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Brand new models</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollProducts(-1)}
            aria-label="Previous products"
          >
            ‹
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollProducts(1)}
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.products} ref={sliderRef}>
        {products.map(product => (
          <div className={styles.product} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
