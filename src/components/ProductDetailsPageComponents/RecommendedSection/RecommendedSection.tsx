import { useState } from 'react';
import styles from './RecommendedSection.module.scss';
import { Product } from '../../types/Product';
import productsData from '../../../../public/api/products.json';
import { ProductCard } from '../../ProductCard/ProductCard';

interface Props {
  currentProduct: Product;
}

export const RecommendedSection = ({ currentProduct }: Props) => {
  const products = productsData as Product[];
  const [offset, setOffset] = useState(0);
  const suggestedProducts = [...products]
    .filter(p => p.id !== currentProduct.id)
    .filter(p => p.category === currentProduct.category)
    .filter(p => p.fullPrice && p.price)
    // .sort(() => 0.5 - Math.random())
    .slice(0, 15);

  const step = 212 + 16;
  const maxOffset = Math.max((suggestedProducts.length - 4) * step, 0);

  const handleNext = () => {
    setOffset(prev => Math.min(prev + step, maxOffset));
  };

  const handlePrev = () => {
    setOffset(prev => Math.max(prev - step, 0));
  };

  return (
    <div>
      <section className={styles.recommended}>
        <h1 className={styles.recTitle}>You may also like</h1>
        <div className={styles.arrows}>
          <button
            onClick={handlePrev}
            disabled={offset === 0}
            className={styles.arrow}
          >
            <img src="../img/icons/arrowLeft.png" alt="left" />
          </button>
          <button
            onClick={handleNext}
            disabled={offset === maxOffset}
            className={styles.arrow}
          >
            <img src="../img/icons/rightArrow.png" alt="right" />
          </button>
        </div>
      </section>
      <div className={styles.gridWrapper}>
        <div
          className={styles.gridContainer}
          style={{
            transform: `translateX(-${offset}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {suggestedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
