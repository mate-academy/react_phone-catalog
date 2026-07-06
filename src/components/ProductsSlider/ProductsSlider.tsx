import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { ButtonArrow } from '../ButtonArrow';
import { SliderTitle } from '../../types/SliderTitle';

type Props = {
  products: Product[];
  showDiscount?: boolean;
  sliderTitle: SliderTitle;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  showDiscount = true,
  sliderTitle,
}) => {
  const [firstVisidleInd, setFirstVisidleInd] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const GAP = 16;
  const offset = cardRef.current
    ? firstVisidleInd * (cardRef.current.offsetWidth + GAP)
    : 0;

  useEffect(() => {
    const calculateVisible = () => {
      const cardWidth = cardRef.current?.offsetWidth;
      const sliderWidth = sliderRef.current?.offsetWidth;

      if (!cardWidth || !sliderWidth) {
        return;
      }

      setVisibleCount(Math.floor(sliderWidth / (cardWidth + GAP)));
    };

    calculateVisible();
    window.addEventListener('resize', calculateVisible);

    return () => {
      window.removeEventListener('resize', calculateVisible);
    };
  }, []);

  const handleNext = () => {
    if (firstVisidleInd >= products.length - visibleCount) {
      return;
    }

    setFirstVisidleInd(firstVisidleInd + 1);
  };

  const handlePrev = () => {
    if (firstVisidleInd === 0) {
      return;
    }

    setFirstVisidleInd(firstVisidleInd - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderTop}>
        <div className={styles.title}>{sliderTitle}</div>

        <div className={styles.sliderButtons}>
          <ButtonArrow
            onClick={handlePrev}
            disabled={firstVisidleInd === 0}
            direction="left"
          />

          <ButtonArrow
            onClick={handleNext}
            disabled={firstVisidleInd === products.length - visibleCount}
            direction="right"
          />
        </div>
      </div>

      <div className={styles.productsSlider} ref={sliderRef}>
        <div
          className={styles.cardsTrack}
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {products.map((prod, i) => (
            <div
              key={prod.id}
              className={styles.productCard}
              ref={i === 0 ? cardRef : null}
            >
              <ProductCard product={prod} showDiscount={showDiscount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
