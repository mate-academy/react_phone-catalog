import { useRef, useState, useEffect } from 'react';
import { type Product } from '../../../../api/products';
import { ProductCard } from '../../../../modules/shared/components/ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  products: Product[];
  showFullPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  showFullPrice = true,
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkPosition = () => {
    const container = listRef.current;

    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    checkPosition();
  }, [products]);

  const scrollByCards = (direction: 'left' | 'right') => {
    const container = listRef.current;

    if (!container) {
      return;
    }

    const firstCard = container.querySelector<HTMLElement>('[data-card]');

    if (!firstCard) {
      return;
    }

    const cardWidth = firstCard.offsetWidth + 16;
    const delta = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;

    container.scrollBy({
      left: delta,
      behavior: 'smooth',
    });

    setTimeout(checkPosition, 300);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.arrows}>
        <button
          type="button"
          className={styles.arrowButton}
          onClick={() => scrollByCards('left')}
          disabled={isAtStart}
        >
          ‹
        </button>

        <button
          type="button"
          className={styles.arrowButton}
          onClick={() => scrollByCards('right')}
          disabled={isAtEnd}
        >
          ›
        </button>
      </div>

      <div className={styles.slider} ref={listRef} onScroll={checkPosition}>
        {products.map(product => (
          <div key={product.id} className={styles.card} data-card>
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </div>
        ))}
      </div>
    </div>
  );
};
