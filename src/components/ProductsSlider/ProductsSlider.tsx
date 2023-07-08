import classNames from 'classnames';
import { FC, useMemo, useState, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { renderArrow } from '../../helpers/renderArrow';
import './productsSlider.scss';

interface Props {
  title: string;
  itemsLength: number;
}

export const ProductsSlider: FC<Props> = ({ children, title, itemsLength }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useAppSelector((state) => state.theme.value);
  const newItemsLength = useMemo(() => itemsLength - 4, [itemsLength]);
  const isFreeRightSpace = useMemo(() => activeIndex === newItemsLength - 1, [
    activeIndex,
    newItemsLength,
  ]);
  const isFreeLeftSpace = useMemo(() => activeIndex === 0, [activeIndex]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  const updateIndex = (newIndex: number) => {
    let updatedIndex = newIndex;

    if (updatedIndex < 0) {
      updatedIndex = 0;
    } else if (updatedIndex >= newItemsLength) {
      updatedIndex = newItemsLength - 1;
    }

    setActiveIndex(updatedIndex);
  };

  const getTranslateXValue = () => {
    if (sliderRef.current) {
      if (sliderRef.current.offsetWidth === 1125) {
        setItemWidth(283);
      } else if (sliderRef.current.offsetWidth >= 1000) {
        setItemWidth(252.5);
      } else if (sliderRef.current.offsetWidth >= 645) {
        setItemWidth(270);
      }
    }
  };

  const handleArrowCLick = (direction: 'left' | 'right') => {
    getTranslateXValue();

    if (direction === 'right') {
      updateIndex(activeIndex + 1);
    } else {
      updateIndex(activeIndex - 1);
    }
  }

  return (
    <div className="products-slider" ref={sliderRef}>
      <div className="products-slider__container">
        <h1 className={`title title--${theme}`}>{title}</h1>

        <div className="products-slider__buttons">
          <button
            type="button"
            onClick={() => handleArrowCLick('left')}
            className={classNames(
              `products-slider__button products-slider__button--${theme}`,
              { disabled: isFreeLeftSpace },
              { [`disabled--${theme}`]: isFreeLeftSpace }
            )}
            disabled={isFreeLeftSpace}
          >
            {!isFreeLeftSpace ? (
              renderArrow('left', theme)
            ) : (
              <img src="new/img/icons/arrow-left-disabled.svg" alt="Left arrow" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleArrowCLick('right')}
            className={classNames(
              `products-slider__button products-slider__button--${theme}`,
              { disabled: isFreeRightSpace },
              { [`disabled--${theme}`]: isFreeRightSpace }
            )}
            disabled={isFreeRightSpace}
          >
            {!isFreeRightSpace ? (
              renderArrow('right', theme)
            ) : (
              <img src="new/img/icons/arrow-right-disabled.svg" alt="Right arrow" />
            )}
          </button>
        </div>
      </div>

      <div
        className="products-slider__inner"
        style={{ transform: `translateX(${-activeIndex * itemWidth}px)` }}
      >
        {children}
      </div>
    </div>
  );
};
