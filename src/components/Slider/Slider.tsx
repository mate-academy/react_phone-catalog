/* eslint-disable max-len */
import { useState } from 'react';
import rightButton from '../../icons/Slider/Left arrow.png';
import leftButton from '../../icons/Slider/Right arrow.png';

import bannerAccessories from '../../icons/Slider/banner/banner-accessories.png';
import bannerPhones from '../../icons/Slider/banner/banner-phones.png';
import bannerTablets from '../../icons/Slider/banner/banner-tablets.png';
import categoryAccessories from '../../icons/Slider/banner/category-accessories.png';

import blackRectangle from '../../icons/Slider/Black rectangle.png';
import greyRectangle from '../../icons/Slider/Grey rectangle.png';

import './Slider.scss';

export const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    let index = newIndex;

    if (newIndex < 0) {
      index = 3;
    } else if (index >= 4) {
      index = 0;
    }

    setActiveIndex(index);
  };

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button
          className="slider__button slider__button--left"
          type="button"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <img src={leftButton} alt="Left button" />
        </button>

        <div className="slider__container" style={{ transform: `translate(-${activeIndex * 1040}px)` }}>
          <img className="slider__img slider__img--item" src={bannerAccessories} alt="Banner Accessories" />
          <img className="slider__img slider__img--item" src={bannerPhones} alt="Banner Phones" />
          <img className="slider__img slider__img--item" src={bannerTablets} alt="Banner Tablets" />
          <img className="slider__img slider__img--item" src={categoryAccessories} alt="Category Accessories" />
        </div>

        <button
          className="slider__button slider__button--right"
          type="button"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <img src={rightButton} alt="Right button" />
        </button>
      </div>
      <div className="slider__rectangles">
        <img src={blackRectangle} alt="Black Rectangle" />
        <img src={greyRectangle} alt="Grey Rectangle" />
        <img src={greyRectangle} alt="Grey Rectangle" />
        <img src={greyRectangle} alt="Grey Rectangle" />
        <img src={greyRectangle} alt="Grey Rectangle" />
      </div>
    </div>
  );
};
