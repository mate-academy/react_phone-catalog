import React, { useRef } from 'react';

import { Product } from '../../types/Product';
import { SliderButton } from '../SheredNavigation';
import { ProductCard } from '../ProductCard';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showFullPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showFullPrice = true,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;

    if (!container) {
      return;
    }

    const scrollAmount = 320;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.productsSlider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <SliderButton
            direction="left"
            onClick={() => handleScroll('left')}
            variant="round"
          />
          <SliderButton
            direction="right"
            onClick={() => handleScroll('right')}
            variant="round"
          />
        </div>
      </div>

      <div className={styles.track} ref={sliderRef}>
        {products.map(product => (
          <div className={styles.item} key={product.id}>
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </div>
        ))}
      </div>
    </section>
  );
};
