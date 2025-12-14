import React, { useState } from 'react';
import { Product } from '@/types';
import { SliderItem } from '../../shared/components/SliderItem/SliderItem';
import styles from './SliderComponent.module.scss';
type SliderComponentProps = {
  products: Product[];
  title: string;
  showDiscount?: boolean;
};
export const SliderComponent: React.FC<SliderComponentProps> = ({
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
        {products.length > 4 && (
          <div className={styles.SliderComponent__buttonGroup}>
            <button
              className={`${styles.SliderComponent__buttonContainer} ${
                index === 0
                  ? styles['SliderComponent__buttonContainer--disabled']
                  : ''
              }`}
              disabled={index === 0}
              onClick={prev}
            >
              {index === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                    fill="#B4BDC4"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                    fill="#313237"
                  />
                </svg>
              )}
            </button>
            <button
              className={`${styles.SliderComponent__buttonContainer} ${
                index + 4 >= products.length
                  ? styles['SliderComponent__buttonContainer--disabled']
                  : ''
              }`}
              disabled={index + 4 >= products.length}
              onClick={next}
            >
              {index + 4 >= products.length ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                    fill="#B4BDC4"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                    fill="#313237"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      <div className={styles.SliderComponent__itemsContainer}>
        {visible.map(prod => (
          <SliderItem key={prod.id} item={prod} showDiscount={showDiscount} />
        ))}
      </div>
    </section>
  );
};
