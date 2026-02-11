import styles from './ProductsSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';

type ProductsSliderProps = {
  products: Product[] | null;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  sliderRef?: React.RefObject<HTMLDivElement>;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  currentIndex,
  handlePrev,
  handleNext,
  handleTouchStart,
  handleTouchEnd,
  sliderRef,
}) => {
  const visibleCount = 2;
  const visible = products
    ? Array.from(
      { length: visibleCount },
      (_, i) => products[(currentIndex + i) % products.length],
    )
    : [];
  const currentProduct =
    products && products.length
      ? products[currentIndex % products.length]
      : null;

  const isPrevDisabled = !products || products.length <= 1;
  const isNextDisabled = !products || currentIndex >= products.length - 1;

  return (
    <div className={styles.productsSlider} ref={sliderRef}>
      <div className={styles.icons}>
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous"
          disabled={isPrevDisabled}
          className={`${styles.icon} ${styles['icon--button--left']} ${isPrevDisabled ? styles.disabled : ''}`}
        />

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next"
          disabled={isNextDisabled}
          className={`${styles.icon} ${styles['icon--button--right']} ${isNextDisabled ? styles.disabled : ''}`}
        />
      </div>
      <div className={styles.productsSlider__banner}>
        {visible.map(product => (
          <div
            key={product.id}
            className={`${styles.product} ${currentProduct && product.id === currentProduct.id ? styles.active : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.productsSlider__content}>
              <img
                src={product.image}
                alt={product.name ?? 'Product Image'}
                className={styles.productsSlider__productImage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
