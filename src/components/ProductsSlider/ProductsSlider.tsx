import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Navigation } from '../../types/navigation';
import { Product } from '../../types/product';
import { MyNavButton } from '../UI/MyNavButton';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[];
  sliderName?: string;
};

const GAP = 16;
const ITEM_MIN_WIGTH = 200;
const MAX_ITEM_IN_SLIDER = 4;
const WRAPPER_MIN_WIDTH = 232;

export const ProductSlider: React.FC<Props> = (
  { products, sliderName },
) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(WRAPPER_MIN_WIDTH);
  const [itemWidth, setItemWidth] = useState(ITEM_MIN_WIGTH);
  const [itemsInSlider, setItemsInSlider] = useState(4);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const totalGap = GAP * (itemsInSlider - 1);
  const cartWidth = (wrapperWidth - totalGap) / itemsInSlider;
  const shift = cartWidth < ITEM_MIN_WIGTH
    ? ITEM_MIN_WIGTH
    : cartWidth;

  const getSliderParams = useCallback(() => {
    const width = wrapper.current
      ? wrapper.current.clientWidth
      : WRAPPER_MIN_WIDTH;

    setWrapperWidth(width);
    setItemWidth((wrapperWidth - totalGap) / itemsInSlider);
    setItemsInSlider(Math.floor(width / ITEM_MIN_WIGTH) > MAX_ITEM_IN_SLIDER
      ? MAX_ITEM_IN_SLIDER
      : Math.floor(width / ITEM_MIN_WIGTH));
  }, [itemsInSlider, totalGap, wrapperWidth]);

  useEffect(() => {
    getSliderParams();

    window.addEventListener('resize', getSliderParams);

    return () => {
      window.removeEventListener('resize', getSliderParams);
    };
  }, [getSliderParams, products]);

  function slideTo(direction: Navigation) {
    switch (direction) {
      case Navigation.left:
        setSlideIndex(current => {
          const nextIndex = current - itemsInSlider;

          return Math.max(nextIndex, 0);
        });
        break;

      case Navigation.right:
        setSlideIndex(current => {
          const nextIndex = current + itemsInSlider;
          const maxIndex = products.length - itemsInSlider;

          return Math.min(nextIndex, maxIndex);
        });
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
            disabled={!slideIndex}
            onClick={direction => slideTo(direction)}
          />

          <MyNavButton
            direction={Navigation.right}
            disabled={slideIndex === products.length - itemsInSlider}
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
                  width: `${itemWidth}px`,
                }}
                className="products-slider__item"
              >
                <ProductCard
                  isNew={sliderName === 'new'}
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
