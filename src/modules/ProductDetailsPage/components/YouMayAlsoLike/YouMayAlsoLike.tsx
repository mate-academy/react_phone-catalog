import { useEffect, useRef, useState } from 'react';

import { getProducts } from '../../../../services/products';
import type { Product } from '../../../../types';
import { ProductCard } from '../../../shared/components/ProductCard';

import styles from './YouMayAlsoLike.module.scss';

type Props = {
  productId: string;
  category: string;
};

export const YouMayAlsoLike = ({ productId, category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        const recommendations = data
          .filter(
            item => item.category === category && item.itemId !== productId,
          )
          .slice(0, 12);

        setProducts(recommendations);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId, category]);

  const scrollProducts = (direction: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const card = slider.firstElementChild as HTMLElement | null;

    if (!card) {
      return;
    }

    const distance = card.offsetWidth + 16;

    slider.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return <p>Loading recommendations...</p>;
  }

  if (hasError) {
    return <p>Unable to load recommendations.</p>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>You may also like</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollProducts(-1)}
            aria-label="Previous recommendations"
          >
            ‹
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollProducts(1)}
            aria-label="Next recommendations"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.products} ref={sliderRef}>
        {products.map(item => (
          <div className={styles.product} key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};
