import React, { useState, useEffect } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

interface Props {
  sortBy: 'age' | 'price';
}

export const ProductsSlider: React.FC<Props> = ({ sortBy }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const itemsPerPage = 4;
  const itemWidth = 288;

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const sorted = [...data];

        if (sortBy === 'age') {
          sorted.sort((a, b) => b.year - a.year);
        } else if (sortBy === 'price') {
          sorted.sort((a, b) => {
            const discountA = a.fullPrice - a.price;
            const discountB = b.fullPrice - b.price;

            return discountB - discountA;
          });
        }

        setProducts(sorted);
      });
  }, [sortBy]);

  const maxIndex = Math.max(0, products.length - itemsPerPage);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= maxIndex;

  const next = () => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prev = () => {
    if (!isFirst) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      return;
    }

    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartX;

    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (dragOffset === 0) {
      return;
    }

    const itemsSwiped = Math.round(-dragOffset / itemWidth);

    let newIndex = currentIndex + itemsSwiped;

    newIndex = Math.max(0, Math.min(newIndex, maxIndex));

    setCurrentIndex(newIndex);
    setDragOffset(0);
    setTouchStartX(null);
  };

  const currentTranslate = -(currentIndex * itemWidth) + dragOffset;

  return (
    <div className={styles.slider}>
      <div className={styles.controls}>
        <button className={styles.arrowBtn} onClick={prev} disabled={isFirst}>
          {'<'}
        </button>
        <button className={styles.arrowBtn} onClick={next} disabled={isLast}>
          {'>'}
        </button>
      </div>

      <div
        className={styles.window}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(${currentTranslate}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease',
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} hideOldPrice={sortBy === 'age'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
