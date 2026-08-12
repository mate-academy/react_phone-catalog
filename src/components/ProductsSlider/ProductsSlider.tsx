import { useEffect, useId, useState } from 'react';
import type { CSSProperties } from 'react';

import { IconButton } from '../IconButton';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { useScreenType, useTranslation } from '../../hooks';
import type { ProductFromServer } from '../../types/product';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: ProductFromServer[];
  isLoading?: boolean;
  isBrandNewSection?: boolean;
};

const GAP = 16;
const SKELETON_ITEMS_COUNT = 4;

const getItemsPerView = (screenType: ReturnType<typeof useScreenType>) => {
  switch (screenType) {
    case 'desktop':
      return 4;

    case 'tablet':
      return 2;

    default:
      return 1;
  }
};

export const ProductsSlider = ({
  title,
  products,
  isLoading = false,
  isBrandNewSection = false,
}: Props) => {
  const t = useTranslation();
  const screenType = useScreenType();
  const titleId = useId();

  const itemsPerView = getItemsPerView(screenType);

  const [position, setPosition] = useState(0);

  const itemsCount = isLoading ? SKELETON_ITEMS_COUNT : products.length;

  const maxPosition = Math.max(itemsCount - itemsPerView, 0);
  const safePosition = Math.min(position, maxPosition);

  const canGoPrev = !isLoading && safePosition > 0;
  const canGoNext = !isLoading && safePosition < maxPosition;

  useEffect(() => {
    setPosition(0);
  }, [products, itemsPerView, isLoading]);

  const handlePrev = () => {
    setPosition(current => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    setPosition(current => Math.min(current + 1, maxPosition));
  };

  const isItemVisible = (index: number) => {
    return index >= safePosition && index < safePosition + itemsPerView;
  };

  const sliderStyle = {
    '--items-per-view': itemsPerView,
    '--card-width': `calc((100% - ${
      (itemsPerView - 1) * GAP
    }px) / ${itemsPerView})`,
  } as CSSProperties;

  const listStyle = {
    transform: `translateX(calc(-${
      (safePosition * 100) / itemsPerView
    }% - ${(safePosition * GAP) / itemsPerView}px))`,
  } as CSSProperties;

  const skeletonItems = Array.from({ length: SKELETON_ITEMS_COUNT }).map(
    (_, index) => {
      const isVisible = isItemVisible(index);

      return (
        <div
          className={styles.item}
          key={index}
          aria-hidden={!isVisible}
          style={{
            visibility: isVisible ? 'visible' : 'hidden',
          }}
        >
          <ProductCardSkeleton />
        </div>
      );
    },
  );

  const productItems = products.map((product, index) => {
    const isVisible = isItemVisible(index);

    return (
      <div
        className={styles.item}
        key={product.itemId}
        aria-hidden={!isVisible}
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        <ProductCard product={product} isBrandNew={isBrandNewSection} />
      </div>
    );
  });

  return (
    <section
      className={styles.slider}
      style={sliderStyle}
      aria-labelledby={titleId}
      aria-busy={isLoading}
    >
      <div className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          {title}
        </h2>

        <div className={styles.buttons}>
          <IconButton
            icon="chevronLeft"
            label={t.common.productSlider.previousProducts}
            disabled={!canGoPrev}
            onClick={handlePrev}
          />

          <IconButton
            icon="chevronRight"
            label={t.common.productSlider.nextProducts}
            disabled={!canGoNext}
            onClick={handleNext}
          />
        </div>
      </div>

      <div className={styles.viewport}>
        <div className={styles.list} style={listStyle}>
          {isLoading ? skeletonItems : productItems}
        </div>
      </div>
    </section>
  );
};
