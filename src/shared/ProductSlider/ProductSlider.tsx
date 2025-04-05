import classNames from 'classnames';
import s from './ProductSlider.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Products';
import { ProductCards } from './components/ProductCards';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  // const touchStartX = useRef(0);
  // const touchEndX = useRef(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 16);
    }
  }, [products]);

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const prevCard = () => {
    setCurrentIndex(prev => prev - 1);
  };

  // const handleTouchStart = (e: React.TouchEvent) => {
  //   touchStartX.current = e.touches[0].clientX;
  // };

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   touchEndX.current = e.touches[0].clientX;
  // };

  // const handleTouchEnd = () => {
  //   const deltaX = touchStartX.current - touchEndX.current;

  //   if (deltaX > 100) {
  //     nextCard();
  //   } else if (deltaX < -100) {
  //     prevCard();
  //   }
  // };

  return (
    <div className="block-margin">
      <div className={classNames(s.title__wrapper, 'container')}>
        <div className={s.title}>
          <h2>{title}</h2>
        </div>
        <div className={s.title__buttons}>
          <button
            className={classNames(s.title__buttons_prev, {
              [s.disable]: currentIndex === 0,
            })}
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            <img src="./img/icons/prev.png" alt="previous card" />
          </button>
          <button className={s.title__buttons_next} onClick={nextCard}>
            <img src="./img/icons/next.png" alt="next card" />
          </button>
        </div>
      </div>
      <div
        className={classNames(s.cards_slider, 'container')}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        <div
          className={s.cards_slide}
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          <ProductCards products={products} cardWidth={cardRef} />
        </div>
      </div>
    </div>
  );
};
