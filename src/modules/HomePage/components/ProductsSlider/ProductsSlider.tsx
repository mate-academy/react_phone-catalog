import styles from './ProductsSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';
import ProductCard from '../../../../components/ProductCard/index';

type ProductsSliderProps = {
  products: Product[] | null;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleAddToCart?: (product: Product) => void;
  handleToggleFavorite?: (productId: string) => void;
  children?: React.ReactNode;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  currentIndex,
  handlePrev,
  handleNext,
  handleAddToCart,
  handleToggleFavorite,
  children,
}) => {


  const hasProducts = Array.isArray(products) && products.length > 0;
  const safeIndex = Number.isInteger(currentIndex) ? currentIndex : 0;
  const visibleCount = 4;
  const notNull = <T,>(v: T | null | undefined): v is T => v != null;
  const arrayFrom = Array.from({ length: visibleCount }, (_, i) => {
    const idx: number = safeIndex + i;

    return idx < products!.length ? products![idx] : null;
  }).filter(notNull);
  const visible: Product[] = hasProducts ? arrayFrom : [];

 /* const currentProduct =
    products &&
    products.length &&
    currentIndex >= 0 &&
    currentIndex < products.length
      ? products[currentIndex]
      : null;
      */

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
            <ProductCard
              product={product}
              index={i}
              className={styles.productsSlider__productInfo}
              handleAddToCart={handleAddToCart}
              handleToggleFavorite={handleToggleFavorite}
              key={product?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
