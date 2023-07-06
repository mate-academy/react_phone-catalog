import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { renderArrow } from '../../helpers/renderArrow';
import './productsSlider.scss';

interface Props {
  title: string;
  itemsLength: number;
  itemsToShow?: number;
}

export const ProductsSlider: FC<Props> = ({
  children, title, itemsLength, itemsToShow = 4,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useAppSelector(state => state.theme.value);
  const newItemsLength = useMemo(() => {
    return itemsLength - itemsToShow;
  }, []);
  const isFreeRightSpace = useMemo(() => {
    return activeIndex === newItemsLength - 1;
  }, [activeIndex]);
  const isFreeLeftSpace = useMemo(() => {
    return activeIndex === 0;
  }, [activeIndex]);

  const updateIndex = (newIndex: number) => {
    let updatedIndex = newIndex;

    if (updatedIndex < 0) {
      updatedIndex = 0;
    } else if (updatedIndex >= newItemsLength) {
      updatedIndex = newItemsLength - 1;
    }

    setActiveIndex(updatedIndex);
  };

  return (
    <div className="products-slider">
      <div className="products-slider__container">
        <h1 className={`title title--${theme}`}>{title}</h1>

        <div className="products-slider__buttons">
          <button
            type="button"
            onClick={() => updateIndex(activeIndex - 1)}
            className={
              classNames(
                `products-slider__button products-slider__button--${theme}`,
                { disabled: isFreeLeftSpace },
                { [`disabled--${theme}`]: isFreeLeftSpace },
              )
            }
            disabled={isFreeLeftSpace}
          >
            {!isFreeLeftSpace ? (
              renderArrow('left', theme)
            ) : (
              <img
                src="new/img/icons/arrow-left-disabled.svg"
                alt="Left arrow"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => updateIndex(activeIndex + 1)}
            className={
              classNames(
                `products-slider__button products-slider__button--${theme}`,
                { disabled: isFreeRightSpace },
                { [`disabled--${theme}`]: isFreeRightSpace },
              )
            }
            disabled={isFreeRightSpace}
          >

            {!isFreeRightSpace ? (
              renderArrow('right', theme)
            ) : (
              <img
                src="new/img/icons/arrow-right-disabled.svg"
                alt="Right arrow"
              />
            )}
          </button>
        </div>
      </div>

      <div
        className="products-slider__inner"
        style={{ transform: `translateX(-${activeIndex * 282.9}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

ProductsSlider.defaultProps = {
  itemsToShow: 4,
};
