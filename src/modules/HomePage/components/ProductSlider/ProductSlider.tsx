import { useRef, useState } from 'react';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/utils/types/apiTypes';
import styles from './ProductSlider.module.scss';

const ITEM_WIDTH = 289;

type Props = {
  products: Product[] | undefined;
  header: string;
};

export const ProductSlider = ({ products, header }: Props) => {
  const [scrollPosition, setScrollPosition] = useState<number | undefined>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScrool = (width: number) => {
    let newScrollPosition;

    if (scrollPosition !== undefined) {
      newScrollPosition = scrollPosition + width;
    } else {
      newScrollPosition = 0;
    }

    if (newScrollPosition > ITEM_WIDTH * 6) {
      newScrollPosition = ITEM_WIDTH * 6;
    }

    if (newScrollPosition < 0) {
      newScrollPosition = 0;
    }

    setScrollPosition(newScrollPosition);

    if (containerRef.current) {
      containerRef.current.scrollLeft = newScrollPosition;
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2>{header}</h2>
        <div className={styles.slider__buttons}>
          <button
            onClick={() => handleScrool(-ITEM_WIDTH)}
            className={styles.slider__button}
          >
            <img src="./icons/ArrowLeft.svg" alt="" />
          </button>

          <button
            onClick={() => handleScrool(ITEM_WIDTH)}
            className={styles.slider__button}
          >
            <img src="./icons/ArrowRight.svg" alt="" />
          </button>
        </div>
      </div>
      <div ref={containerRef} className={styles.slider__products}>
        {products?.map(product => {
          return (
            <ProductCard
              category={product.category}
              id={product.name}
              key={product.id}
              name={product.name}
              images={product.image}
              priceDiscount={product.price}
              priceRegular={product.fullPrice}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          );
        })}
      </div>
    </div>
  );
};
