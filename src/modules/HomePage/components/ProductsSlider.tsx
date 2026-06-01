import { useRef } from 'react';
import { Product } from '../../../types';
import { ProductCard } from '../../../components/ProductCard';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
}: ProductsSliderProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: number) => {
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollBy({ left: direction * 280, behavior: 'smooth' });
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.buttons}>
          <button type="button" onClick={() => handleScroll(-1)}>
            ◀
          </button>
          <button type="button" onClick={() => handleScroll(1)}>
            ▶
          </button>
        </div>
      </div>
      <div className={styles.list} ref={listRef}>
        {products.map(product => (
          <div key={product.itemId || product.id} className={styles.item}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};
