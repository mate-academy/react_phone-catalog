import React, { useState, useEffect } from 'react';
import className from 'classnames';

import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';


type Props = {
  products: ProductInfo[];
  title: string;
}

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {

  const firstProduct = products[0],
        secondProduct = products[1],
        thirdProduct = products[2],
        fourthProduct = products[3],
        lastProduct = products[products.length - 1],
        slides = [
          lastProduct,
          ...products,
          firstProduct,
          secondProduct,
          thirdProduct,
          fourthProduct,
        ],
        slidesLength = slides.length,
        slideWidth = 100 / slidesLength;

  let positionX1 = 0,
      positionX2 = 0,
      positionFinal: number,
      minDistance = 50;

  const [activeCard, setActiveCard] = useState(1);
  const [sliderCounter, setSliderCounter] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(-activeCard * slideWidth);
  const [allowShift, setAllowShift] = useState(true);
  const [shifting, setShifting] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    setSliderPosition(-activeCard * slideWidth);
  }, [activeCard, slideWidth]);

  const stopEvent = (e: React.TransitionEvent) => {
    e.stopPropagation();
  };

  const stopAutoplay = (e: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      setAutoplay(false);
    }
  }

  const checkCounter = () => {
    setShifting(false);

    if (sliderCounter === -1) {
      setActiveCard(slidesLength - 5);
      setSliderCounter(slidesLength - 6);
    } else if (sliderCounter === slidesLength - 5) {
      setActiveCard(1);
      setSliderCounter(0);
    }

    setAllowShift(true);
  };

  const shiftSlider = (direction: number, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      stopAutoplay(e);
    }

    setShifting(true);

    if (allowShift) {
      if (direction === 1) {
        setActiveCard(activeCard === slidesLength - 1 ? 0 : activeCard + 1);
        setSliderCounter(sliderCounter + 1);
      } else if (direction === -1) {
          setActiveCard(activeCard === 0 ? slidesLength - 1 : activeCard - 1);
          setSliderCounter(sliderCounter - 1);
        }
    }

    setAllowShift(false);
  };

  useEffect(() => void setTimeout(() => setAutoplay(true), 5000), [autoplay]);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setTimeout(() => shiftSlider(1), 5000);
    return () => clearTimeout(timer);

  }, [autoplay, activeCard, sliderCounter]);

  const touchStart = (e: React.TouchEvent) => {
    stopAutoplay(e);

    if (e.type === 'touchstart') {
      positionX1 = e.nativeEvent.touches[0].clientX;
    }
  };

  const touchMove =  (e: React.TouchEvent) => {
    stopAutoplay(e);

    if (e.type === 'touchmove') {
      positionX2 = positionX1 - e.nativeEvent.touches[0].clientX;
    }
  };

  const touchEnd = (e: React.TouchEvent) => {
    stopAutoplay(e);

    if (e.type === 'touchend') {
      positionFinal = e.nativeEvent.changedTouches[0].clientX;
    }

    if (Math.abs(positionFinal - positionX1) > minDistance) {
      if (positionFinal > positionX1 + positionX2) {
        shiftSlider(-1, e);
      } else {
        shiftSlider(1, e);
      }
    }
  };

  const sliderStyles = {
    transform: `translateX(${sliderPosition}%)`,
  }

  return (
    <section className="slider container-center">

      <div className="slider__header">
        <h1>{title}</h1>
        <div className="slider__controls">
          <button
            type="button"
            className="slider__button"
            onClick={(e) => shiftSlider(-1, e)}
          >
            <svg className="slider__button-icon">
              <use href="./icons/arrows.svg#arrow-left">
              </use>
            </svg>
          </button>
          <button
            type="button"
            className="slider__button"
            onClick={(e) => shiftSlider(1, e)}
          >
            <svg className="slider__button-icon">
              <use href="./icons/arrows.svg#arrow-right">
              </use>
            </svg>
          </button>
        </div>
      </div>

      <div className="slider__wrapper">
        <div
          className={className('slider__items', {'slider__items--shifting': shifting})}
          style={sliderStyles}
          onTransitionEnd={checkCounter}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
        >

          {slides.map((product, i) => (
            <ProductCard
              product={product}
              key={product.id + i}
              stopEvent={stopEvent}
            />
          ))}

        </div>
      </div>

    </section>
  );
};

