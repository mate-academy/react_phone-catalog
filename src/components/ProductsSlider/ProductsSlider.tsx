/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type ProductsSliderProps = {
  goods: Product[],
  name: string,
  useDiscount?: boolean,
  extraClass?: string;
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  goods,
  name,
  useDiscount = false,
  extraClass,
  setFavLength,
  setCartLength,
}) => {
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const ShowPrevSlide = () => {
    setSliderIndex(index => index - 1);
  };

  const ShowNextSlide = () => {
    setSliderIndex(index => index + 1);
  };

  return (
    <div
      className={classNames('product-slider', extraClass)}
    >
      <div className="product-slider__top">
        <h1 className="product-slider__top-title">
          {name}
        </h1>

        <div className="product-slider__top-buttons-container">
          <button
            type="button"
            className="product-slider__top-btn"
            disabled={sliderIndex === 0}
            onClick={() => ShowPrevSlide()}
          />

          <button
            type="button"
            className="product-slider__top-btn product-slider__top-btn--right"
            disabled={sliderIndex === Math.ceil(goods.length / 4) - 1}
            onClick={() => ShowNextSlide()}
          />
        </div>
      </div>

      <div
        className="product-slider__content"
      >
        {goods.map(good => (
          <ProductCard
            key={good.name}
            product={good}
            useDiscount={useDiscount}
            sliderIndex={sliderIndex}
            setFavLength={setFavLength}
            setCartLength={setCartLength}
          />
        ))}
      </div>
    </div>
  );
};
