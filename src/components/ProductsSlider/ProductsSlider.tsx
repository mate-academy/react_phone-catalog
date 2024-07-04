import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  products: Product[];
  discount: boolean;
  darkTheme: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  discount,
  darkTheme,
}) => {
  const [shift, setShift] = useState<number>(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [slideWidth, setSlideWidth] = useState<number>(212);

  const step = 1;

  useEffect(() => {
    if (document.documentElement.clientWidth < 640) {
      setSlideWidth(212);
    }

    if (document.documentElement.clientWidth >= 640) {
      setSlideWidth(237);
    }

    if (document.documentElement.clientWidth >= 1200) {
      setSlideWidth(272);
    }
  }, [slideWidth]);

  const stopShift = products.length * (slideWidth + 16) - 16;
  const shiftPerOneClick = step * (slideWidth + 16);
  const availableCountOfShifts = Math.round(stopShift / shiftPerOneClick);

  useEffect(() => {
    if (shift === 0) {
      setIsPrevButtonDisabled(true);
    }

    if (shift < 0) {
      setIsPrevButtonDisabled(false);
    }

    if (window.innerWidth < 400 && shift === -availableCountOfShifts + 1) {
      setIsNextButtonDisabled(true);
    }

    if (window.innerWidth < 400 && shift > -availableCountOfShifts + 1) {
      setIsNextButtonDisabled(false);
    }

    if (window.innerWidth < 1200 && shift === -availableCountOfShifts + 2) {
      setIsNextButtonDisabled(true);
    }

    if (window.innerWidth < 1200 && shift > -availableCountOfShifts + 2) {
      setIsNextButtonDisabled(false);
    }

    if (window.innerWidth >= 1200 && shift === -availableCountOfShifts + 4) {
      setIsNextButtonDisabled(true);
    }

    if (window.innerWidth >= 1200 && shift > -availableCountOfShifts + 4) {
      setIsNextButtonDisabled(false);
    }
  }, [products.length, availableCountOfShifts, shift]);

  return (
    <section className="brand-new-models">
      <div className="brand-new-models__top">
        <h3 className="brand-new-models__title title">{title}</h3>
        <div className="brand-new-models__nav">
          <button
            className={cn('button icon-arrow-left', {
              'button--disabled': isPrevButtonDisabled,
              'button--dark-theme': darkTheme,
              'button--dark-theme-disabled': isPrevButtonDisabled && darkTheme,
            })}
            onClick={() => {
              setShift(currentShift => currentShift + 1);
            }}
            disabled={isPrevButtonDisabled}
          ></button>

          <button
            className={cn('button icon-arrow-right', {
              'button--disabled': isNextButtonDisabled,
              'button--dark-theme': darkTheme,
              'button--dark-theme-disabled': isNextButtonDisabled && darkTheme,
            })}
            onClick={() => {
              setShift(currentShift => currentShift - 1);
            }}
            disabled={isNextButtonDisabled}
          ></button>
        </div>
      </div>
      <div className="brand-new-models__container">
        <div
          className="brand-new-models__slider"
          style={{
            transform: `translateX(${shift * step * (slideWidth + 16)}px)`,
          }}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              discount={discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
