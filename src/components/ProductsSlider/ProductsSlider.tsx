import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';

import arrowLeftDefault from '../../assets/icons/Chevron (Arrow Left).svg';
import arrowLeftHover from '../../assets/icons/Chevron (Arrow Left).svg';
import arrowLeftDisabled from '../../assets/icons/Chevron (Arrow Left Gray).svg';

import arrowRightDefault from '../../assets/icons/Chevron (Arrow Right).svg';
import arrowRightHover from '../../assets/icons/Chevron (Arrow Right).svg';
import arrowRightDisabled from '../../assets/icons/Chevron (Arrow Right Gray).svg';

import { useState, useEffect } from 'react';

interface ProductsSliderProps {
  title: string;
  products: {
    id: number;
    originalId: number;
    image: string;
    title: string;
    price: string;
    oldPrice?: string;
    specs: string[];
    isFirst?: boolean;
  }[];
  visibleCountDesktop: number;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  products,
  visibleCountDesktop,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleCountDesktop);
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

  const total = products.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1200) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [visibleCountDesktop]);

  const visibleProducts = Array.from({ length: visibleCount }, (_, i) => {
    return products[(startIndex + i) % total];
  });

  useEffect(() => {
    setIsOverflowing(total > visibleCount);
  }, [total, visibleCount]);

  const handlePrev = () => {
    setStartIndex(prev => (prev - visibleCount + total) % total);
  };

  const handleNext = () => {
    setStartIndex(prev => (prev + visibleCount) % total);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.arrows}>
          <button
            className={`${styles.arrowBtn} ${styles.arrowLeft} ${
              !isOverflowing ? styles.disabled : ''
            }`}
            onClick={handlePrev}
            disabled={!isOverflowing}
            onMouseEnter={() => setHoveredLeft(true)}
            onMouseLeave={() => setHoveredLeft(false)}
          >
            <img
              src={
                !isOverflowing
                  ? arrowLeftDisabled
                  : hoveredLeft
                    ? arrowLeftHover
                    : arrowLeftDefault
              }
              alt="Prev"
            />
          </button>

          <button
            className={`${styles.arrowBtn} ${styles.arrowRight} ${
              !isOverflowing ? styles.disabled : ''
            }`}
            onClick={handleNext}
            disabled={!isOverflowing}
            onMouseEnter={() => setHoveredRight(true)}
            onMouseLeave={() => setHoveredRight(false)}
          >
            <img
              src={
                !isOverflowing
                  ? arrowRightDisabled
                  : hoveredRight
                    ? arrowRightHover
                    : arrowRightDefault
              }
              alt="Next"
            />
          </button>
        </div>
      </div>
      <div className={styles.productsWrapper}>
        <div className={styles.productsGrid}>
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              originalId={product.originalId}
              image={product.image}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              specs={product.specs}
              isFirst={product.isFirst}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
