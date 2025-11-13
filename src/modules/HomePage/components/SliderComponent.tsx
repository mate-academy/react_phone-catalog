import { Product } from '@/types';
import React, { useState } from 'react';
import styles from './SliderComponent.module.scss';
import SliderItem from './SliderItem';
type SliderComponentProps = {
  products: Product[];
  title: string;
};
const SliderComponent: React.FC<SliderComponentProps> = ({
  products,
  title,
}) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex(prev => Math.min(prev + 4, products.length - 4));
  };
  const prev = () => {
    setIndex(prev => Math.max(prev - 4, 0));
  };

  const preparedProducts = products.sort((a, b) => b.year - a.year);
  const visible = preparedProducts.slice(index, index + 4);
  
  return (
    <>
      <div className={styles.SliderComponent__headerContainer}>
        <h2>{title}</h2>
        <div className={styles.SliderComponent__buttonGroup}>
          <button
            className={styles.SliderComponent__buttonContainer}
            disabled={index === 0}
            onClick={prev}
          >
            <img src="/img/arrow-left.svg" alt="Previous" />
          </button>
          <button
            className={styles.SliderComponent__buttonContainer}
            disabled={index + 4 >= products.length}
            onClick={next}
          >
            <img src="/img/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.SliderComponent__itemsContainer}>
        {visible.map(prod => (
          <SliderItem key={prod.id} item={prod} />
        ))}
      </div>
    </>
  );
};

export default SliderComponent;
