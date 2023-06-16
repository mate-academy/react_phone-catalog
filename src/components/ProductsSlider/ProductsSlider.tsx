import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';
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
        <h1 className="products-slider__title title">{title}</h1>

        <div className="products-slider__buttons">
          <button
            type="button"
            onClick={() => updateIndex(activeIndex - 1)}
            className={
              classNames(
                'products-slider__button',
                { disabled: isFreeLeftSpace },
              )
            }
            disabled={isFreeLeftSpace}
          >
            {!isFreeLeftSpace ? (
              <img
                src="/_new/img/icons/arrow-left.svg"
                alt="Left arrow"
              />
            ) : (
              <img
                src="/_new/img/icons/arrow-left-disabled.svg"
                alt="Left arrow"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => updateIndex(activeIndex + 1)}
            className={
              classNames(
                'products-slider__button',
                { disabled: isFreeRightSpace },
              )
            }
            disabled={isFreeRightSpace}
          >

            {!isFreeRightSpace ? (
              <img
                src="/_new/img/icons/arrow-right.svg"
                alt="Right arrow"
              />
            ) : (

              <img
                src="/_new/img/icons/arrow-right-disabled.svg"
                alt="Right arrow"
              />
            )}
          </button>
        </div>
      </div>

      <div
        className="products-slider__inner"
        style={{ transform: `translateX(-${activeIndex * 283}px)` }} // gotta play with it more
      >
        {children}
      </div>
    </div>
  );
};

ProductsSlider.defaultProps = {
  itemsToShow: 4,
};
