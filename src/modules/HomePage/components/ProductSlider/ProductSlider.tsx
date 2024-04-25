import styles from './ProductSlider.module.scss';
import { icons } from '../../../../shared/global/Icons';
import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../../../../components/ProductCard';
import { ProductInfo } from '../../../../types/ProductInfo';
import { RoundedArrow } from '../../../../components/RondedArrowBtn';
import { ProductCardType } from '../../../../types/ProductCardType';

type Props = {
  title: string;
  products: ProductInfo[];
  type: ProductCardType;
};

export const ProductSlider: React.FC<Props> = ({ title, products, type }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(212);
  const [cardsInView, setCardsinView] = useState(1);
  const cardsToMove = 1;
  const gap = 16;

  useEffect(() => {
    const checkWidth = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 639) {
        setCardWidth(212);
      } else if (screenWidth <= 1199) {
        setCardWidth(237);
        setCardsinView(2);
      } else {
        setCardWidth(272);
        setCardsinView(4);
      }
    };

    checkWidth();

    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  const handlePrevClick = () => {
    const newStartIndex = startIndex - cardsToMove;

    setStartIndex(Math.max(newStartIndex, 0));
  };

  const handleNextClick = () => {
    const maxStartIndex = products.length - cardsInView;
    const newStartIndex = Math.min(startIndex + cardsToMove, maxStartIndex);

    setStartIndex(newStartIndex);
  };

  const carouselListStyles = useMemo(
    () => ({
      width: `${(cardWidth + gap) * products.length + gap}px`,
      transform: `translateX(-${startIndex * (cardWidth + gap)}px)`,
      transition: 'transform 0.5s ease',
    }),
    [cardWidth, gap, products.length, startIndex],
  );

  const leftArrowDis = startIndex === 0;
  const rightArrowDis = startIndex >= products.length - cardsInView;

  return (
    <section className={styles.productSlider}>
      <div className={styles.topWrapepr}>
        <h2>{title}</h2>
        <div className={styles.btnWrapper}>
          <button
            className={styles.btnSlider}
            onClick={handlePrevClick}
            disabled={leftArrowDis}
          >
            <RoundedArrow
              icon={leftArrowDis ? icons.arrowLeftDis : icons.arrowLeft}
              disabled={leftArrowDis}
            />
          </button>
          <button
            className={styles.btnSlider}
            onClick={handleNextClick}
            disabled={rightArrowDis}
          >
            <RoundedArrow
              icon={rightArrowDis ? icons.arrowRightDis : icons.arrowRight}
              disabled={rightArrowDis}
            />
          </button>
        </div>
      </div>

      <div className={styles.productsWrap}>
        <div className={styles.products} style={carouselListStyles}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              type={type}
              cardWidth={cardWidth}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
