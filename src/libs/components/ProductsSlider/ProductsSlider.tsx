/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import {
  useRef,
  useState,
  useEffect,
} from 'react';
import { useSwipeable } from 'react-swipeable';

import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';
import { Icon } from '../Icon';
import { IProduct } from '../../types';

import './ProductsSlider.scss';

type CardProp = {
  cardWidth: number;
  cardsPerSlide: number;
  sliderWidth: number;
  containerGap: number;
} | null;

type Props = {
  items: IProduct [];
  title: string;
  classNames?: string;
};

export const ProductsSlider:React.FC<Props> = ({
  items,
  title,
  classNames,
}) => {
  const totalCardsCount = items.length;
  const firstSlideId = 1;
  const startOffset = 0;
  const [slideId, setSlideId] = useState(firstSlideId);
  const [translateX, setTranslateX] = useState(startOffset);
  const [sliderProp, setSliderProp] = useState<CardProp>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const lastSlideId = totalCardsCount;
  const gap = sliderProp?.containerGap || 0;
  const cardSize = (sliderProp?.cardWidth || 0) + gap;
  const sliderSize = sliderProp?.sliderWidth || 0;
  const cardsPerSlide = sliderProp?.cardsPerSlide || 0;
  const cardsContainerWidth = (totalCardsCount * cardSize) - gap;

  const isPrevButtonDisabled = slideId === firstSlideId;
  const isNextButtonDisabled = slideId === lastSlideId;

  const handlePrevClick = () => {
    if (slideId - cardsPerSlide === firstSlideId) {
      setSlideId(firstSlideId);
      setTranslateX(startOffset);

      return;
    }

    if (slideId > firstSlideId) {
      setSlideId(prev => prev - 1);
      setTranslateX(prev => prev + cardSize);
    }
  };

  const handleNextClick = () => {
    if (slideId === totalCardsCount - cardsPerSlide) {
      setSlideId(lastSlideId);
      setTranslateX(-(cardsContainerWidth - sliderSize));

      return;
    }

    if (slideId < lastSlideId) {
      setSlideId(prev => prev + 1);
      setTranslateX(prev => prev - cardSize);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  useEffect(() => {
    const onResize = () => {
      if (!cardsContainerRef.current || !sliderRef.current) {
        return;
      }

      const container = cardsContainerRef.current;
      const sliderWidth = sliderRef.current.offsetWidth;
      const child1 = container.children[0];
      const child2 = container.children[1];
      const child1RightCoord = child1.getBoundingClientRect().right;
      const child2XCoord = child2.getBoundingClientRect().x;
      const cardWidth = child1.getBoundingClientRect().width;
      const containerGap = child2XCoord - child1RightCoord;
      const visibleCardsOnSlide = Math.floor(sliderWidth / cardWidth);

      setSliderProp({
        cardWidth,
        cardsPerSlide: visibleCardsOnSlide,
        sliderWidth,
        containerGap,
      });
      setSlideId(firstSlideId);
      setTranslateX(startOffset);
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      className={cn('products-slider', classNames)}
    >
      <div className="products-slider__header">
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
        className="products-slider__slider"
        {...swipeHandlers}
        ref={sliderRef}
      >
        <div
          className="products-slider__cards"
          data-cy="cardsContainer"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'all 900ms',
          }}
          ref={cardsContainerRef}
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
    </section>
  );
};
