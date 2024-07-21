/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Slider.scss';
import { useSwipeable } from 'react-swipeable';
import { Product, PageTitle, SliderData } from '../../types';
import { ProductCard } from '../Pages/ProductCard/ProductCard';
import { Images } from '../../images';
import { getSliderParams } from '../../utils/service';

type Props = {
  title: PageTitle;
  products: Product[];
};

export const Slider: React.FC<Props> = ({ title, products }) => {
  const [sliderData, setSliderData] = useState<SliderData>({
    itemWidth: 272,
    translate: 0,
    translateIndex: 4,
    translateCount: 0,
    pageWidth: 1200,
    sliderWidth: 1136,
  });
  const { itemWidth, translate, translateIndex, translateCount, sliderWidth } =
    sliderData;

  useEffect(() => {
    const updateSliderParams = () =>
      setSliderData(currentData => {
        return getSliderParams(products.length, currentData);
      });

    updateSliderParams();
    window.addEventListener('resize', updateSliderParams);

    return () => window.removeEventListener('resize', updateSliderParams);
  }, [products.length]);

  const getFixTranslate = (direction: boolean) => {
    const itemsForSlider = Math.ceil(sliderWidth / itemWidth);

    if (!direction) {
      if (translateCount + translateIndex >= products.length) {
        return (
          translate + (itemsForSlider * (itemWidth + 16) - sliderWidth - 16)
        );
      } else {
        return translate + itemWidth + 16;
      }
    } else {
      if (translateCount + translateIndex + 1 === products.length) {
        return (
          translate - (itemsForSlider * (itemWidth + 16) - sliderWidth - 16)
        );
      } else {
        return translate - itemWidth - 16;
      }
    }
  };

  const handlePrevClick = () => {
    setSliderData(currentData => {
      return translate < 0
        ? {
          ...currentData,
          translate: getFixTranslate(false),
          translateCount: translateCount - 1,
        }
        : { ...currentData, translate: 0, translateCount: 0 };
    });
  };

  const nextClickСondition = translateCount + translateIndex < products.length;

  const handleNextClick = () => {
    if (nextClickСondition) {
      setSliderData(currentData => ({
        ...currentData,
        translate: getFixTranslate(true),
        translateCount: translateCount + 1,
      }));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
    trackMouse: true,
  });

  return (
    <section className="slider">
      <div className="slider__hBLock">
        <h2 className="slider__hBLock--title">{title}</h2>

        <div className="slider__hBLock--buttons selection-off">
          <button
            className={classNames('button', {
              button__disabled: translate === 0,
            })}
            onClick={handlePrevClick}
          >
            <img
              src={Images.Button.Slider}
              alt="defaultImg-left"
              className="slider__hBLock--buttons-imgLeft"
            />
          </button>

          <button
            className={classNames('button', {
              button__disabled: !nextClickСondition,
            })}
            onClick={handleNextClick}
          >
            <img
              src={Images.Button.Slider}
              alt="defaultImg-right"
              className="slider__hBLock--buttons-imgRight"
            />
          </button>
        </div>
      </div>

      <ul className="slider__list selection-off" {...handlers}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            translate={translate}
          />
        ))}
      </ul>
    </section>
  );
};
