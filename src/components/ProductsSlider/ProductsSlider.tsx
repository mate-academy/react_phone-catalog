import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from '../../types/navigation';
import { Product } from '../../types/product';
import { MyNavButton } from '../UI/MyNavButton';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[];
};

const GAP = 16;
const ITEM_MIN_WIGTH = 200;
const MAX_ITEM_IN_SLIDER = 4;
const WRAPPER_MIN_WIDTH = 232;

export const ProductSlider: React.FC<Props> = ({ products }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(WRAPPER_MIN_WIDTH);
  const [itemsInSlider, setItemsInSlider] = useState(MAX_ITEM_IN_SLIDER);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const totalGap = GAP * (itemsInSlider - 1);
  const cartWidth = (wrapperWidth - totalGap) / itemsInSlider;
  const shift = cartWidth < ITEM_MIN_WIGTH ? ITEM_MIN_WIGTH : cartWidth;

  const getSliderParams = () => {
    const width = wrapper.current
      ? wrapper.current.clientWidth
      : WRAPPER_MIN_WIDTH;

    setWrapperWidth(width);
    setItemsInSlider(Math.floor(width / ITEM_MIN_WIGTH) > MAX_ITEM_IN_SLIDER
      ? MAX_ITEM_IN_SLIDER
      : Math.floor(width / ITEM_MIN_WIGTH));
  };

  useEffect(() => {
    getSliderParams();

    window.addEventListener('resize', getSliderParams);

    return () => {
      window.removeEventListener('resize', getSliderParams);
    };
  }, [products]);

  function slideTo(direction: Navigation) {
    switch (direction) {
      case Navigation.left:
        setSlideIndex(current => current + 1);
        break;

      case Navigation.right:
        if (slideIndex) {
          setSlideIndex(current => current - 1);
        }

        break;

      default:
        break;
    }
  }

  return (
    <div className="products-slider">
      <div className="products-slider__box">
        <div className="products-slider__nav">
          <MyNavButton
            direction={Navigation.left}
            disabled={slideIndex === products.length - itemsInSlider}
            onClick={direction => slideTo(direction)}
          />

          <MyNavButton
            direction={Navigation.right}
            disabled={!slideIndex}
            onClick={direction => slideTo(direction)}
          />
        </div>

        <div
          className="products-slider__wrapper"
          ref={wrapper}
        >
          <div
            data-cy="cardsContainer"
            className="products-slider__carts"
            style={{ transform: `translateX(-${slideIndex * (shift + GAP)}px)` }}
          >
            {products.map(product => (
              <div
                key={product.id}
                style={{
                  width: `${(wrapperWidth - totalGap) / itemsInSlider}px`,
                }}
                className="products-slider__item"
              >
                <ProductCard
                  isNew
                  product={product}
                  key={product.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
