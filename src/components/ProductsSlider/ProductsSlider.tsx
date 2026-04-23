import { useMemo, useState, useRef, useEffect } from 'react';
import { Product } from '../../types/product';
import { getSuggestedProducts } from '../../utils/productUtils';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (products.length === 0) {
      return [];
    }

    switch (title) {
      case 'Brand new models': {
        const maxYear = Math.max(...products.map(p => p.year));

        return products.filter(product => product.year === maxYear);
      }

      case 'Hot prices': {
        return products
          .filter(p => p.fullPrice > p.price)
          .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
      }

      case 'You may also like': {
        return getSuggestedProducts(products).slice(0, 8);
      }

      default:
        return products;
    }
  }, [products, title]);

  const updateStep = () => {
    if (listRef.current && listRef.current.children.length > 0) {
      const card = listRef.current.children[0] as HTMLElement;
      const gap = 16;

      setStep(card.offsetWidth + gap);
    }
  };

  useEffect(() => {
    updateStep();
    window.addEventListener('resize', updateStep);

    return () => window.removeEventListener('resize', updateStep);
  }, [filteredProducts]);

  const maxIndex = useMemo(() => {
    if (!listRef.current || step === 0) {
      return 0;
    }

    const containerWidth = listRef.current.parentElement?.offsetWidth || 0;
    const visibleCards = Math.floor(containerWidth / step);

    return Math.max(0, filteredProducts.length - visibleCards);
  }, [filteredProducts.length, step]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section className={styles.ProductsSlider}>
      <div className={styles.ProductsSlider__top}>
        <h2 className={styles.ProductsSlider__title}>{title}</h2>
        <div className={styles.ProductsSlider__buttons}>
          <button
            type="button"
            className={`${styles.ProductsSlider__btn} ${styles['ProductsSlider__btn--prev']}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          />
          <button
            type="button"
            className={`${styles.ProductsSlider__btn} ${styles['ProductsSlider__btn--next']}`}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next slide"
          />
        </div>
      </div>

      <div className={styles.ProductsSlider__window}>
        <div
          ref={listRef}
          className={styles.ProductsSlider__list}
          style={{ transform: `translateX(-${currentIndex * step}px)` }}
        >
          {filteredProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
