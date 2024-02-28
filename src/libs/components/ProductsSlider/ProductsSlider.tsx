/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';
import { Icon } from '../Icon';
import { IProduct } from '../../types';

import './ProductsSlider.scss';

type CardProp = {
  cardSize: number;
  cardsPerSlide: number;
} | null;

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
  const totalCardsCount = items.length;
  const firstSlideId = 1;
  const [slideId, setSlideId] = useState(firstSlideId);
  const [cardProp, setCardProp] = useState<CardProp>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const lastSlideId = cardProp
    ? totalCardsCount - (cardProp.cardsPerSlide - 1)
    : totalCardsCount;

  const getSliderProp = useCallback(() => {
    if (!cardsContainerRef.current) {
      return null;
    }

    if (!sliderRef.current) {
      return null;
    }

    if (!items.length) {
      return null;
    }

    const container = cardsContainerRef.current;
    const sliderWidth = sliderRef.current.offsetWidth;
    const itemWidth = container.children[0].getBoundingClientRect().width;
    const itemsPerSlide = Math.floor(sliderWidth / itemWidth);
    const containerGap = (sliderWidth - (itemsPerSlide * itemWidth))
      / (itemsPerSlide - 1) || 0;

    return {
      cardSize: itemWidth + containerGap,
      cardsPerSlide: itemsPerSlide,
    };
  }, [cardsContainerRef, sliderRef, items]);

  const isPrevButtonDisabled = slideId === firstSlideId;
  const isNextButtonDisabled = slideId === lastSlideId;

  const translateX = useMemo(() => {
    if (!cardsContainerRef.current || !cardProp) {
      return 0;
    }

    return (-(slideId - 1) * cardProp.cardSize);
  }, [slideId, cardProp]);

  const handlePrevClick = () => {
    setSlideId(prev => {
      if (prev === firstSlideId) {
        return prev;
      }

      return prev - 1;
    });
  };

  const handleNextClick = () => {
    setSlideId(prev => {
      if (prev === lastSlideId) {
        return prev;
      }

      return prev + 1;
    });
  };

  useEffect(() => {
    setCardProp(getSliderProp());
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
