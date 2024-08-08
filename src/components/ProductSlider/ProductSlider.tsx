import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './ProductSlider.module.scss';
import { Card } from '../Card';
import { Icon } from '../ui/Icon';

type ProductSliderProps = {
  cardData: number[];
  title: string;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  cardData,
  title,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardsContainerRef.current) {
        const cardElement = cardsContainerRef.current
          .children[0] as HTMLElement;

        if (cardElement) {
          const gap =
            parseFloat(getComputedStyle(cardsContainerRef.current).gap) || 0;

          setCardWidth(cardElement.offsetWidth + gap);
        }
      }
    };

    updateCardWidth();

    window.addEventListener('resize', updateCardWidth);

    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);

  const nextSlide = () => {
    setActiveIndex(prevIndex =>
      prevIndex === cardData.length - 1 ? prevIndex : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  return (
    <section id={title.toLowerCase()}>
      <div className={classNames(styles.productSlider__topBar)}>
        <h3 className={classNames(styles.productSlider__title)}>{title}</h3>
        <div className={classNames(styles.productSlider__sliderButtons)}>
          <button
            className={classNames(styles.productSlider__btn, {
              [styles['productSlider__btn--disabled']]: activeIndex === 0,
            })}
            onClick={prevSlide}
            disabled={activeIndex === 0}
          >
            <Icon iconName="left" />
          </button>
          <button
            className={classNames(styles.productSlider__btn, {
              [styles['productSlider__btn--disabled']]:
                activeIndex === cardData.length - 1,
            })}
            onClick={nextSlide}
            disabled={activeIndex === cardData.length - 1}
          >
            <Icon iconName="right" />
          </button>
        </div>
      </div>

      <div className={classNames(styles.productSlider__cardsWrapper)}>
        <div
          className={classNames(styles.productSlider__cards)}
          style={{
            transform: `translateX(-${activeIndex * cardWidth}px)`,
            transition: `transform 0.3s ease-in-out`,
          }}
          ref={cardsContainerRef}
        >
          {cardData.map((_, index) => (
            <div key={index} className={classNames(styles.productSlider__card)}>
              <Card />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
