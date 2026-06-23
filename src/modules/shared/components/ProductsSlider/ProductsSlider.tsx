import { useRef } from 'react';
import { ProductSummary } from '../../types/catalog';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: ProductSummary[];
}

export const ProductsSlider = ({ title, products }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    node.scrollBy({
      left:
        direction === 'left' ? -node.clientWidth * 0.8 : node.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            {products.length} models ready to explore
          </p>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleScroll('left')}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleScroll('right')}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      <div ref={containerRef} className={styles.track}>
        {products.map(product => (
          <div key={product.itemId} className={styles.slide}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
