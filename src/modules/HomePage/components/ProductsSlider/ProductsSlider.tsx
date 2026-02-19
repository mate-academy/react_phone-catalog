import styles from './ProductsSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';
import { Link } from 'react-router-dom';
import FavouritesLink from '../../../../components/FavouritesLink/index';

type ProductsSliderProps = {
  products: Product[] | null;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  children?: React.ReactNode;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  currentIndex,
  handlePrev,
  handleNext,
  children,
}) => {
  const visibleOnTablet = 2;
  const visibleOnDesktop = 4;

  const hasProducts = Array.isArray(products) && products.length > 0;
  const safeIndex = Number.isInteger(currentIndex) ? currentIndex : 0;
  const visibleCount = 4;
  const notNull = <T,>(v: T | null | undefined): v is T => v != null;
  const arrayFrom = Array.from({ length: visibleCount }, (_, i) => {
    const idx: number = safeIndex + i;

    return idx < products!.length ? products![idx] : null;
  }).filter(notNull);
  const visible: Product[] = hasProducts ? arrayFrom : [];

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
    <div className={styles.productsSlider}>
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
        <div className={styles.productsSlider__list}>
          {visible.map((product, i) => (
            <div
              key={product?.id}
              className={`${styles.product} ${currentProduct && product?.id === currentProduct.id ? styles.active : ''}
                  ${i === 1 ? styles.mobile : ''}
                  ${i > 1 && i <= visibleOnTablet ? styles.tablet : ''}
                  ${i <= visibleOnDesktop ? styles.desktop : ''}`}
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
                <div className={styles.productPriceRow}>
                  <p className={styles.productsSlider__productPrice}>
                    <a>${product?.price}&nbsp;</a>
                  </p>
                  <p className={styles.productsSlider__productFullPrice}>
                    {`$${product?.fullPrice}`}
                  </p>
                </div>
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
    </div>
  );
};
