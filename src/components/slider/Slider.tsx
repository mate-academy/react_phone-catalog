/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';
import React, { useEffect, useRef, useState } from 'react';
import { Product, SliderTitle } from '../../types/types';
import { ProductCard } from '../ProductCard';
import { images } from '../../images';
import classNames from 'classnames';

import './Slider.scss';

type Props = {
  title: SliderTitle;
  products: Product[];
};

export const Slider: React.FC<Props> = ({ title, products }) => {
  const sliderListSizeRef = useRef<HTMLUListElement>(null);
  const sliderListWidth = sliderListSizeRef.current?.clientWidth;
  const [itemWidth, setItemWidth] = useState(0);
  const gap = 18;
  const [padding, setPadding] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [lastElementTranslate, setLastElementTranslate] = useState(0);
  const [islastElement, setIsLastElement] = useState(false);

  useEffect(() => {
    const updateItemWidth = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        setItemWidth(270);
        setPadding(16);
      } else if (screenWidth >= 640) {
        setItemWidth(235);
        setPadding(16);
      } else {
        setItemWidth(210);
        setPadding(0);
      }
    };

    updateItemWidth();

    window.addEventListener('resize', updateItemWidth);

    return () => {
      window.removeEventListener('resize', updateItemWidth);
    };
  }, []);

  useEffect(() => {
    if (sliderListWidth) {
      const elementsInSlider = Math.ceil(sliderListWidth / (itemWidth + gap));

      if (islastElement) {
        if (lastElementTranslate !== 0) {
          setCurrentIndex(products.length - elementsInSlider);
        }

        if (itemWidth === 270) {
          setLastElementTranslate(0);
        } else {
          setLastElementTranslate(
            sliderListWidth -
              elementsInSlider * (itemWidth + gap) -
              padding / 2,
          );
        }

        setCurrentTranslate(
          currentIndex * (-itemWidth - gap) + lastElementTranslate,
        );
      } else {
        setCurrentTranslate(currentIndex * (-itemWidth - gap));
      }
    }
  }, [
    currentIndex,
    islastElement,
    itemWidth,
    lastElementTranslate,
    padding,
    products.length,
    sliderListWidth,
  ]);

  const handleNextClick = () => {
    if (sliderListWidth) {
      const elementsInSlider = Math.ceil(sliderListWidth / (itemWidth + gap));

      if (
        itemWidth === 270 &&
        currentIndex + 1 >= products.length - elementsInSlider
      ) {
        setIsLastElement(true);
      }

      if (currentIndex < products.length - elementsInSlider) {
        setCurrentIndex(currentIndex + 1);
        setCurrentTranslate((currentIndex + 1) * (-itemWidth - gap));
      } else if (
        !(sliderListWidth + padding === elementsInSlider * (itemWidth + gap)) &&
        lastElementTranslate === 0
      ) {
        setCurrentTranslate(
          currentIndex * (-itemWidth - gap) +
            (sliderListWidth -
              elementsInSlider * (itemWidth + gap) -
              padding / 2),
        );
        setLastElementTranslate(
          sliderListWidth - elementsInSlider * (itemWidth + gap) - padding / 2,
        );
        setIsLastElement(true);
      } else {
        setIsLastElement(true);
      }
    }
  };

  const handlePrevClick = () => {
    if (lastElementTranslate !== 0) {
      setCurrentTranslate(currentTranslate - lastElementTranslate);
      setLastElementTranslate(0);
      setIsLastElement(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTranslate((currentIndex - 1) * (-itemWidth - gap));
      setIsLastElement(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  return (
    <div className="slider" {...handlers}>
      <div className="slider__hBlock container selection-off">
        <h2 className="slider__hBlock--title">{title}</h2>
        <div className="slider__hBlock--buttons">
          <button
            className={classNames('button', {
              'slider__hBlock--button-unActive': currentIndex === 0,
            })}
            onClick={handlePrevClick}
          >
            <img
              src={images.sliderButton}
              alt="leftBtn"
              className="slider__hBlock--buttons-imgLeft"
            />
          </button>
          <button
            className={classNames('button', {
              'slider__hBlock--button-unActive': islastElement,
            })}
            onClick={handleNextClick}
          >
            <img
              src={images.sliderButton}
              alt="rightBtn"
              className="slider__hBlock--buttons-imgRight"
            />
          </button>
        </div>
      </div>

      <ul className="slider__list" ref={sliderListSizeRef}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            translate={currentTranslate}
            brandNew={title === SliderTitle.NewModels}
          />
        ))}
      </ul>
    </div>
  );
};
