/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import {
  useRef, useState, useCallback, useEffect,
} from 'react';

import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';
import { Icon } from '../Icon';
import { IProduct } from '../../types';

import './ProductsSlider.scss';

type Props = {
  items: IProduct [],
  title: string,
  classNames?: string,
};

export const ProductsSlider:React.FC<Props> = ({
  items,
  title,
  classNames,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [gap, setGap] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);

  const totalCardsCount = items.length;
  const firstIndex = 0;
  const lastIndex = totalCardsCount - visibleCardsCount;

  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const isPrevButtonDisabled = currentIndex === firstIndex;
  const isNextButtonDisabled = currentIndex === lastIndex;

  const handlePrevClick = useCallback(() => {
    if (!cardsContainerRef.current) {
      return;
    }

    if (!sliderRef.current) {
      return;
    }

    if (!isPrevButtonDisabled) {
      setTranslateX(prev => prev + (cardWidth + gap));
      setCurrentIndex(prev => prev - 1);
    }
  }, [cardWidth, gap, isPrevButtonDisabled]);

  const handleNextClick = useCallback(() => {
    if (!cardsContainerRef.current) {
      return;
    }

    if (!sliderRef.current) {
      return;
    }

    if (!isNextButtonDisabled) {
      setTranslateX(prev => prev - (cardWidth + gap));
      setCurrentIndex(prev => prev + 1);
    }
  }, [cardWidth, gap, isNextButtonDisabled]);

  const getSliderProp = useCallback(() => {
    if (!cardsContainerRef.current) {
      return;
    }

    if (!sliderRef.current) {
      return;
    }

    if (!items.length) {
      return;
    }

    const container = cardsContainerRef.current;
    const sliderWidth = sliderRef.current.offsetWidth;
    const itemWidth = container.children[0].getBoundingClientRect().width;
    const itemsPerSlide = Math.floor(sliderWidth / itemWidth);
    const containerGap = (sliderWidth - (itemsPerSlide * itemWidth))
      / (itemsPerSlide - 1) || 0;

    setVisibleCardsCount(itemsPerSlide);
    setCardWidth(itemWidth);
    setGap(containerGap);
  }, [cardsContainerRef, sliderRef, items]);

  useEffect(() => {
    getSliderProp();
    window.addEventListener('resize', getSliderProp);

    return () => {
      window.removeEventListener('resize', getSliderProp);
    };
  }, [getSliderProp]);

  return (
    <div
      className={cn('cards-container', classNames)}
    >
      <div className="cards-container__header">
        <SectionHeader
          title={title}
        />

        <div className="section-buttons">
          <button
            type="button"
            className="section-buttons__button"
            onClick={handlePrevClick}
          >
            <Icon
              iconName="arrowLeft"
              classNames={cn(
                'section-buttons__icon',
                { 'section-buttons__icon--disabled': isPrevButtonDisabled },
              )}
            />
          </button>

          <button
            type="button"
            className="section-buttons__button"
            onClick={handleNextClick}
          >

            <Icon
              iconName="arrowRight"
              classNames={cn(
                'section-buttons__icon',
                { 'section-buttons__icon--disabled': isNextButtonDisabled },
              )}
            />
          </button>
        </div>
      </div>

      <div
        className="cards-container__slider"
        ref={sliderRef}
      >
        <div
          className="cards-container__cards"
          data-cy="cardsContainer"
          ref={cardsContainerRef}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'all 900ms',
          }}
        >
          {
            items.map((el) => (
              <ProductCard
                product={el}
                key={el.id}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};
