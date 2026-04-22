import { useState } from 'react';
import styles from './HotPrices.module.scss';
import productsData from '../../../public/api/products.json';
import { ProductCard } from '../ProductCard/ProductCard';
// import { HotProduct } from './types/HotProduct';
import { Product } from '../types/Product';

export const HotPrices = () => {
  const products = productsData as Product[];

  const hotPrices: Product[] = [...products]
    .filter(p => p.fullPrice && p.price)
    .sort((a, b) => {
      const discountA = (a.priceRegular || 0) - (a.priceDiscount || 0);
      const discountB = (b.priceRegular || 0) - (b.priceDiscount || 0);

      return discountB - discountA;
    })
    .slice(0, 15);

  const [offset, setOffset] = useState(0);
  const step = 212 + 16;
  const maxOffset = (hotPrices.length - 4) * step;
  // const maxOffset = Math.max(0, (hotPrices.length - 4) * step);

  const handleNext = () => {
    setOffset(prev => Math.min(prev + step, maxOffset));
  };

  const handlePrev = () => {
    setOffset(prev => Math.max(prev - step, 0));
  };

  return (
    <div>
      <div className={styles.top}>
        <h3 className={styles.h3_title}>Hot prices</h3>
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
          {hotPrices.map(product => (
            <div key={product.id} className={styles.slideCard}>
              <ProductCard product={product} showDiscount={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
