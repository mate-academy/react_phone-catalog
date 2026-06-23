import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import styles from './ProductsCarousel.module.scss';
import { getAllProducts } from '../../../../api';
import { ProductCard } from '../../../../shared/components/ProductCard';
import { Loader } from '../../../../shared/components/Loader';
import { ErrorMessage } from '../../../../shared/components/ErrorMessage';
import type { CartItem, Product } from '../../../../types';

type Props = {
  title: string;
  mode: 'hot' | 'new';
  cart: CartItem[];
  favorites: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const ProductsCarousel: React.FC<Props> = ({
  title,
  mode,
  cart,
  favorites,
  onAddToCart,
  onToggleFavorite,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const track = trackRef.current;
  const isAtStart = scrollPosition <= 0;
  const isAtEnd = track
    ? scrollPosition + track.clientWidth >= track.scrollWidth - 1
    : false;

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setError('');

    getAllProducts()
      .then(setProducts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const prepared = useMemo(() => {
    const list = [...products];

    if (mode === 'hot') {
      return list
        .filter(p => p.fullPrice > p.price)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 12);
    }

    return list.sort((a, b) => b.year - a.year).slice(0, 12);
  }, [products, mode]);

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = trackRef.current;

    if (!el) {
      return;
    }

    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 0;
    const gap = 16;
    const step = Math.round(cardWidth + gap);

    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrl}
            onClick={() => scrollByCards('left')}
            disabled={isAtStart}
          >
            {'<'}
          </button>
          <button
            type="button"
            className={styles.ctrl}
            onClick={() => scrollByCards('right')}
            disabled={isAtEnd}
          >
            {'>'}
          </button>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && error && (
        <ErrorMessage message={error} onRetry={loadProducts} />
      )}

      {!isLoading && !error && (
        <div
          ref={trackRef}
          className={styles.track}
          onScroll={e =>
            setScrollPosition((e.target as HTMLDivElement).scrollLeft)
          }
        >
          {prepared.map(p => {
            const isInCart = cart.some(
              item => item.product.itemId === p.itemId,
            );
            const isFavorite = favorites.some(item => item.itemId === p.itemId);

            return (
              <div key={p.id} className={styles.cardWrap}>
                <ProductCard
                  product={p}
                  productId={p.itemId}
                  isInCart={isInCart}
                  isFavorite={isFavorite}
                  onAddToCart={onAddToCart}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
