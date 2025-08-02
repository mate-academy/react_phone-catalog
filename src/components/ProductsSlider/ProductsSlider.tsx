import { useState } from 'react';
import { getProducts } from '../../modules/shared/services/productService';
import { Arrow } from '../Arrow';
import { Card } from '../Card';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title: string;
  filter: (product: any) => boolean;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ title, filter }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  function handleArrowClick(direction: 'left' | 'right') {
    setScrollPosition(prev => {
      if (direction === 'left') {
        return Math.max(prev - 1, 0);
      } else {
        return prev + 1;
      }
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={`homeTitle`}>{title}</h2>

        <div className={styles.arrows}>
          <Arrow
            direction='left'
            isDisabled={scrollPosition === 0}
            onClick={() => handleArrowClick('left')}
          />
          <Arrow
            direction='right'
            isDisabled={false}
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className={styles.content}>
        {getProducts().filter(filter).map((product) => (
          <Card key={product.id} card={product} />
        ))}
      </div>
    </section>
  );
}