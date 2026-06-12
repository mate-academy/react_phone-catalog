import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  isShowDiscount: boolean;
};
export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  isShowDiscount,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const maxIndex = products.length - 4;

  return (
    <div className={styles.section}>
      <div className={styles['product-slider__header']}>
        <h2 className={styles['product-slider__title']}>{title}</h2>

        <div className={styles['product-slider__buttons']}>
          <button
            className={styles['product-slider__button']}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src={`${import.meta.env.BASE_URL}/img/buttons/arrow-left.png`} />
          </button>

          <button
            className={styles['product-slider__button']}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            <img src={`${import.meta.env.BASE_URL}/img/buttons/arrow-right.png`} />
          </button>
        </div>
      </div>
      <div className={styles['product-slider__wrapper']}>
        <ul
          className={styles['product-slider__list']}
          style={{
            transform: `translateX(-${currentIndex * 288}px)`,
          }}
        >
          {products.map(product => (
            <li key={product.id}>
              {' '}
              <ProductCard product={product} isShowDiscount={isShowDiscount} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
