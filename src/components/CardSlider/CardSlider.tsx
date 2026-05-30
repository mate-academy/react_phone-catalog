import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../Card/Card';
import cn from 'classnames';
import { Product } from '../../types/ProductsType';

type Props = {
  cardTitle: string;
  productCards: Product[];
  classnames?: string;
};

export const CardSlider: React.FC<Props> = ({
  cardTitle,
  productCards,
  classnames,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [cardWidth, setCardWidth] = useState(0);

  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  const updateButtonStates = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const maxScrollLeft =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      setIsLeftActive(scrollLeft > 0);
      setIsRightActive(scrollLeft < maxScrollLeft);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const updateCardWidth = () => {
      if (sliderRef.current) {
        const firstCard = sliderRef.current.querySelector(
          '.card-slider__products > div',
        ) as HTMLDivElement;

        if (firstCard) {
          const gap = parseInt(
            window.getComputedStyle(sliderRef.current).gap || '0',
          );
          const cardWidthWithGap = firstCard.offsetWidth + gap;

          setCardWidth(cardWidthWithGap);
        }
      }
    };

    updateCardWidth();
    updateButtonStates();

    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener('scroll', updateButtonStates);
    }

    window.addEventListener('resize', updateCardWidth);

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', updateButtonStates);
      }

      window.removeEventListener('resize', updateCardWidth);
    };
  }, [productCards]);

  return (
    <div className={`card-slider ${classnames}`}>
      <div className="card-slider__top">
        <h1 className="card-slider__title">{cardTitle}</h1>
        <div className="card-slider__btn__block">
          <button
            className="card-slider__btn__link"
            onClick={scrollLeft}
            disabled={!isLeftActive}
          >
            <div
              className={cn('icon', {
                'icon--array--left--light': isLeftActive,
                'icon--array--left--dark': !isLeftActive,
              })}
            ></div>
          </button>
          <button
            className="card-slider__btn__link"
            onClick={scrollRight}
            disabled={!isRightActive}
          >
            <div
              className={cn('icon', {
                'icon--array--right--light': isRightActive,
                'icon--array--right--dark': !isRightActive,
              })}
            ></div>
          </button>
        </div>
      </div>
      <div className="card-slider__products" ref={sliderRef}>
        {productCards.map(product => (
          <Card
            product={product}
            className="card-slider__product-card"
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};
