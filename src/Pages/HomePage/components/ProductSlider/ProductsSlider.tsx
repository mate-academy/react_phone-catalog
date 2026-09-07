import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductItem } from '../../../../shared/components/ProductItem';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  uniqueProducts: Product[];
  index: number;
  fullPrice?: boolean;
};

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleResize() {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 300);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return width;
}

export const ProductsSlider: React.FC<Props> = ({
  uniqueProducts,
  index,
  fullPrice,
}) => {
  const width = useWindowWidth();

  const productWidth = useMemo(() => {
    if (width >= 1200) {
      return 288;
    }

    if (width >= 640) {
      return 253;
    }

    return 228;
  }, [width]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slider__list}
        style={{ transform: `translateX(-${index * productWidth}px)` }}
      >
        {uniqueProducts.map(product => (
          <ProductItem
            widthItem="homePage"
            key={product.itemId}
            product={product}
            fullPrice={fullPrice}
            find={true}
          />
        ))}
      </div>
    </div>
  );
};
