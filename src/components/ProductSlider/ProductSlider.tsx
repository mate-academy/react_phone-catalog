import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ProductCard } from '../ProductCard';
import { LimitedProduct } from '../../types/Product';
import styles from './ProductSlider.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import chevronIconDT from '../../img/icons/ChevronIcon--DarkTheme.svg';
import { useAppContext } from '../../context/AppContext';

type ProductSliderProps = {
  title: string;
  count: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({ title, count }) => {
  const [products, setProducts] = useState<LimitedProduct[]>([]);
  const { theme } = useAppContext();
  const sliderRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [positionCount, setPositionCount] = useState<number>(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://meljaszuk.github.io/react_phone-catalog/api/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const displayedItems = useMemo(() => {
    return products.slice(-count);
  }, [products, count]);

  const getScrollStep = () => {
    if (sliderRef.current) {
      return sliderRef.current.clientWidth * (count / 100);
    }
    return 0;
  };

  const handlePositionCount = (change: number) => {
    setPositionCount((prev) => prev + change);
  };

  const handleNextSlide = () => {
    const step = getScrollStep();
    if (step > 0) {
      handlePositionCount(1);
      setPosition((prevPosition) => prevPosition - step);
    }
  };

  const handlePreviousSlide = () => {
    const step = getScrollStep();
    if (step > 0) {
      handlePositionCount(-1);
      setPosition((prevPosition) => prevPosition + step);
    }
  };

  return (
    <div className={styles.productSlider}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttonContainer}>
          <button
            className={styles.arrowButton}
            onClick={() => {
              if (positionCount !== 0) {
                handlePreviousSlide();
              }
            }}
          >
            <img src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`} alt="scroll left" />
          </button>

          <button
            className={styles.arrowButton}
            onClick={() => {
              if (positionCount !== 6) {
                handleNextSlide();
              }
            }}
          >
            <img src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`} alt="scroll right" className={styles.iconNext} />
          </button>
        </div>
      </div>

      <div className={styles.topContainer}>
        <div className={styles.sliderContainer}>
          <div className={styles.slideWraper}>
            <ul
              className={styles.slideList}
              ref={sliderRef}
              style={{
                transform: `translateX(${position}px)`,
              }}
            >
              {displayedItems.map((product) => (
                <li key={product.id} className={styles.productCard}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
