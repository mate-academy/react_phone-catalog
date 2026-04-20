import styles from './BrandNewModels.module.scss';
import products from '../../../public/api/products.json';
import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const BrandNewModels = () => {
  const newModels = [...products].sort((a, b) => b.year - a.year);
  const [offset, setOffset] = useState(0);
  const visibleCards =
    window.innerWidth >= 1200 ? 4 : window.innerWidth >= 640 ? 3 : 2;
  const cardWidth =
    window.innerWidth >= 1200 ? 272 : window.innerWidth >= 640 ? 237 : 212;
  const step = cardWidth + 16;
  const maxOffset = (newModels.length - visibleCards) * step;

  const handleNext = () => {
    setOffset(prev => Math.min(prev + step, maxOffset));
  };

  const handlePrev = () => {
    setOffset(prev => Math.max(prev - step, 0));
  };
  return (
    <div>
      <div className={styles.top}>
        <h2 className={styles.h2_title}>Brand new models</h2>
        <div className={styles.arrows}>
          <button
            onClick={handlePrev}
            disabled={offset === 0}
            className={styles.arrow}
          >
            <img src="./img/icons/arrowLeft.png" alt="left" />
          </button>
          <button
            onClick={handleNext}
            disabled={offset === maxOffset}
            className={styles.arrow}
          >
            <img src="./img/icons/rightArrow.png" alt="right" />
          </button>
        </div>
      </div>
      <div className={styles.gridWrapper}>
        <div
          className={styles.gridContainer}
          style={{
            transform: `translateX(-${offset}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {newModels.map(product => (
            <div key={product.id} className={styles.slideCard}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
