import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  title: string;
  products: Product[];
  showOldPrice?: boolean;
};

export const ProductList: React.FC<Props> = ({
  title,
  products,
  showOldPrice,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const { scrollLeft, scrollWidth, offsetWidth } = slider;

    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + offsetWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.addEventListener('scroll', handleScroll);

    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    handleScroll(); // викликається одразу після DOM layout
  }, [products]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className={styles['products-list']}>
      <div className={styles['products-list__header']}>
        <h2>{title}</h2>
        <div className={styles['products-list__controls']}>
          <button
            onClick={scrollLeft}
            disabled={isAtStart}
            className={`${styles['arrow-button']} ${
              isAtStart ? styles['arrow-button--disabled'] : ''
            }`}
          >
            <img
              src="/img/Icons/Buttons/Icons/arrow-left.svg"
              alt="Scroll left"
            />
          </button>
          <button
            onClick={scrollRight}
            disabled={isAtEnd}
            className={`${styles['arrow-button']} ${
              isAtEnd ? styles['arrow-button--disabled'] : ''
            }`}
          >
            <img
              src="/img/Icons/Buttons/Icons/arrow-right.svg"
              alt="Scroll right"
            />
          </button>
        </div>
      </div>

      <div className={styles['products-list__slider']} ref={sliderRef}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showOldPrice={showOldPrice}
          />
        ))}
      </div>
    </div>
  );
};
