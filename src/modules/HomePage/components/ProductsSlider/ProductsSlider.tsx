import styles from './ProductsSlider.module.scss';

import { Product } from '../../../../../public/api/types/Product';
import ProductCard from '../../../../components/ProductCard/index';
import IconButtonLeft from '../../../../components/IconButtonLeft/index';
import IconButtonRight from '../../../../components/IconButtonRight/index';

type ProductsSliderProps = {
  products: Product[] | null;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  children?: React.ReactNode;
  skipDiscount?: boolean;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  currentIndex,
  handlePrev,
  handleNext,
  children,
  skipDiscount,
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

  const isPrevDisabled = !products || currentIndex <= 0;
  const isNextDisabled = !products || currentIndex >= products.length - 1;

  return (
    <div className={styles.productsSlider}>
      <div className={styles.productsSlider__title}>
        <h3>{children}</h3>
      </div>
      <div className={styles.productsSlider__topBar}>
        <div className={`${styles.prodWctsSlider__icons} ${styles.icons}`}>
          <IconButtonLeft
            className={`${styles.icon} ${styles['icon--button-left']}`}
            handleClick={handlePrev}
            isDisabled={isPrevDisabled}
          />
          <IconButtonRight
            className={`${styles.icon} ${styles['icon--button-right']}`}
            handleClick={handleNext}
            isDisabled={isNextDisabled}
          />
        </div>
      </div>

      <div className={styles.productsSlider__content}>
        <div className={styles.productsSlider__list}>
          {visible.map((product, i) => (
            <ProductCard
              product={product}
              index={i}
              className={styles.productsSlider__product}
              key={product?.id}
              skipDiscount={skipDiscount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
