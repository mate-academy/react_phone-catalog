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

  //#region handleFunctions

  const handleNext = () => setPosition(position + 1);
  const handlePrev = () => setPosition(position - 1);

  //#endregion

  return (
    <div className={styles.slider}>
      <div className={styles.topSlider}>
        <h2>{title}</h2>
        <div className={styles.sliderButton}>
          <button type="button" onClick={handlePrev} disabled={position === 0}>
            <img src="/img/buttons/slider_button_disabled.png" alt="" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={position >= products.length - 1}
          >
            <img src="/img/buttons/slider_button_default.png" alt="" />
          </button>
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
