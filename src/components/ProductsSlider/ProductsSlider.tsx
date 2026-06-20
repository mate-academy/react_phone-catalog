import { useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: Props) => {
  const [position, setPosition] = useState(0);

  const handleNext = () => setPosition(position + 1);
  const handlePrev = () => setPosition(position - 1);

  return (
    <div className={styles.slider}>
      <div className={styles.topSlider}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            onClick={handlePrev}
            disabled={position === 0}
            className={styles.buttonLeft}
          />
          <button
            type="button"
            onClick={handleNext}
            disabled={position >= products.length - 1}
            className={styles.buttonRight}
          />
        </div>
      </div>
      <div
        className={styles.track}
        style={{ transform: `translateX(${-position * 228}px)` }}
      >
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
