import { Product } from '@/types';
import React, { useState } from 'react';
import styles from './SliderComponent.module.scss';
import SliderItem from './SliderItem';
type SliderComponentProps = {
  products: Product[];
  title: string;
  showDiscount?: boolean;
};
const SliderComponent: React.FC<SliderComponentProps> = ({
  products,
  title,
  showDiscount = false,
}) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex(prev => Math.min(prev + 4, products.length - 4));
  };

  const prev = () => {
    setIndex(prev => Math.max(prev - 4, 0));
  };

  const visible = products.slice(index, index + 4);

  return (
    <section>
      <div className={styles.SliderComponent__headerContainer}>
        <h2>{title}</h2>
        <div className={styles.SliderComponent__buttonGroup}>
          <button
            className={styles.SliderComponent__buttonContainer}
            disabled={index === 0}
            onClick={prev}
          >
            <img src="img/arrow-left.svg" alt="Previous" />
          </button>
          <button
            className={styles.SliderComponent__buttonContainer}
            disabled={index + 4 >= products.length}
            onClick={next}
          >
            <img src="img/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.SliderComponent__itemsContainer}>
        {visible.map(prod => (
          <SliderItem key={prod.id} item={prod} showDiscount={showDiscount} />
        ))}
      </div>
    </section>
  );
};

export default SliderComponent;
