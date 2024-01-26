import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

import './styles.scss';

import { ButtonViews, IconNames, PRODUCTS_GAP } from '../../enums';
import { Button } from '../button/Button';
import { Product } from '../product/Product';
import { ProductType } from '../../types';

type Props = {
  products: ProductType[],
  title: string,
  className?: string,
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  className,
}) => {
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsTotalCount, setCardsTotalCount] = useState(0);
  const [cardsPerSlideCount, setCardsPerSlideCount] = useState(0);

  const firstPosition = 0;
  const lastPosition = cardsTotalCount - cardsPerSlideCount;

  const [position, setPosition] = useState(firstPosition);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setPosition((prevPosition => (
      prevPosition + 1 <= lastPosition
        ? prevPosition + 1
        : lastPosition
    )));
  };

  const handlePrev = () => {
    setPosition((prevPosition => (
      prevPosition - 1 >= firstPosition
        ? prevPosition - 1
        : firstPosition
    )));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  useEffect(() => {
    const updateSliderState = () => {
      const slider = sliderRef.current;

      if (slider) {
        const sliderWidth = slider.getBoundingClientRect().width;
        const cards = slider.children;
        const sliderCardWidth = cards[0].getBoundingClientRect().width;
        const cardsPerSlide = Math.round(sliderWidth / sliderCardWidth);

        setPosition(firstPosition);
        setCardsPerSlideCount(cardsPerSlide);
        setCardsTotalCount(cards.length);
        setCardWidth(sliderCardWidth);
      }
    };

    updateSliderState();

    window.addEventListener('resize', updateSliderState);

    return () => {
      window.removeEventListener('resize', updateSliderState);
    };
  }, [sliderRef]);

  return (
    <section
      className={classNames(className, 'product-slider')}
      {...swipeHandlers}
    >
      <div className="product-slider__top">
        <h1>{title}</h1>
        <div className="product-slider__controls">
          <Button
            view={ButtonViews.ICON_BORDER}
            icon={IconNames.ARROW}
            iconOptions={{ rotate: 180 }}
            className="product-slider__controls-btn"
            onClick={handlePrev}
            disabled={position === firstPosition}
          />

          <Button
            view={ButtonViews.ICON_BORDER}
            icon={IconNames.ARROW}
            className="product-slider__controls-btn"
            onClick={handleNext}
            disabled={position === lastPosition}
          />
        </div>
      </div>

      <div className="product-slider__products" ref={sliderRef}>
        {products.map(product => (
          <Product
            key={product.id}
            className="product-slider__product"
            style={{
              transform: `translateX(-${position * (cardWidth + PRODUCTS_GAP)}px)`,
            }}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
