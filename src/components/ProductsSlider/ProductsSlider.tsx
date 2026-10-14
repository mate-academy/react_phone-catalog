import { useEffect, useId, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const trackId = useId();
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const updateControls = () => {
      setCanScrollBack(track.scrollLeft > 1);
      setCanScrollForward(
        track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
      );
    };

    updateControls();
    track.addEventListener('scroll', updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);

    observer.observe(track);

    return () => {
      track.removeEventListener('scroll', updateControls);
      observer.disconnect();
    };
  }, [products]);

  const scroll = (direction: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const cardWidth =
      track.firstElementChild?.getBoundingClientRect().width || 272;
    const cardsPerScroll = Math.max(
      1,
      Math.floor(track.clientWidth / (cardWidth + 16)),
    );

    track.scrollBy({
      left: direction * (cardWidth + 16) * cardsPerScroll,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  if (!products.length) {
    return null;
  }

  return (
    <section
      className={`${styles.slider} ${title === 'Hot prices' ? styles.hot : ''}`}
      aria-labelledby={headingId}
    >
      <div className={styles.heading}>
        <h2 id={headingId} className="page-subtitle">
          {title}
        </h2>
        <div className={styles.controls}>
          <button
            className={`icon-button ${styles.arrow}`}
            type="button"
            aria-label={`Previous ${title.toLowerCase()} products`}
            aria-controls={trackId}
            disabled={!canScrollBack}
            onClick={() => scroll(-1)}
          >
            <Icon name="left" />
          </button>
          <button
            className={`icon-button ${styles.arrow}`}
            type="button"
            aria-label={`Next ${title.toLowerCase()} products`}
            aria-controls={trackId}
            disabled={!canScrollForward}
            onClick={() => scroll(1)}
          >
            <Icon name="right" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        id={trackId}
        className={styles.track}
        role="region"
        aria-label={`${title} products`}
      >
        {products.map(product => (
          <ProductCard
            key={product.itemId}
            product={product}
            showDiscount={showDiscount}
          />
        ))}
      </div>
    </section>
  );
};
