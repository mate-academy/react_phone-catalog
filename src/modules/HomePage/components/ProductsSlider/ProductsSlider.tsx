import styles from './ProductsSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';
import { Link } from 'react-router-dom';
import FavouritesLink from '../../../../components/FavouritesLink/index';

type ProductsSliderProps = {
  products: Product[] | null;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  sliderRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  currentIndex,
  handlePrev,
  handleNext,
  handleTouchStart,
  handleTouchEnd,
  sliderRef,
  children,
}) => {
  const visibleCount = 1;
  const visible =
    products && products.length
      ? Array.from({ length: visibleCount }, (_, i) => {
          const idx = currentIndex + i;

        return idx < products.length ? products[idx] : null;
        }).filter(Boolean)
      : [];
  const currentProduct =
    products &&
    products.length &&
    currentIndex >= 0 &&
    currentIndex < products.length
      ? products[currentIndex]
      : null;

  const isPrevDisabled = !products || currentIndex <= 0;
  const isNextDisabled = !products || currentIndex >= products.length - 1;

  return (
    <div className={styles.productsSlider} ref={sliderRef}>
      <div className={styles.productsSlider__title}>
        <h3>{children}</h3>
      </div>
      <div className={styles.productsSlider__topBar}>
        <div className={`${styles.productsSlider__icons} ${styles.icons}`}>
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
      </div>

        <div className={styles.productsSlider__content}>
          {visible.map(product => (
            <div
              key={product?.id}
              className={`${styles.product} ${currentProduct && product?.id === currentProduct.id ? styles.active : ''}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.productsSlider__productInfo}>
                <div className={styles.productsSlider__productImageContainer}>
                  <img
                    src={product?.image}
                    alt={product?.name ?? 'Product Image'}
                    className={styles.productsSlider__productImage}
                  />
                </div>
                <Link
                  to={`/product/${product?.id}`}
                  className={styles.productsSlider__productName}
                >
                  {product?.name}
                </Link>
                <p className={styles.productsSlider__productPrice}>
                  <a>${product?.price}&nbsp;</a>
                </p>
                <p className={styles.productsSlider__productFullPrice}>
                  {`$${product?.fullPrice}`}
                </p>

                <div className={styles.productsSlider__productInfoTable}>
                  <div className={styles.productFeature}>Screen</div>
                  <div className={styles.productValue}>{product?.screen}</div>
                  <div className={styles.productFeature}>Capacity</div>
                  <div className={styles.productValue}>{product?.capacity}</div>
                  <div className={styles.productFeature}>RAM</div>
                  <div className={styles.productValue}>{product?.ram}</div>
                </div>

                <div className={styles.productsSlider__bottom}>
                  <button
                    type="button"
                    aria-label="Add to cart"
                    className={`${styles.button} ${styles['button--add-to-card']}`}
                  >
                    Add to cart
                  </button>
                  <FavouritesLink
                    className={`${styles.icon}  ${styles['icon--wide']} ${styles['icon--favourites']}`}
                  />
                </div>
              </div>
            </div>
          ))}
        
      </div>
    </div>
  );
};
