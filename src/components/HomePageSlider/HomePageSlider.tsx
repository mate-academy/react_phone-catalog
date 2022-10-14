/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';

import './HomePageSlider.scss';

export const HomePageSlider: React.FC = () => {
  const sliderImages = [
    { url: 'img/phones/Banner.png', alt: 'Iphone', number: 0 },
    { url: 'img/phones/banner2.jpg', alt: 'Another', number: 1 },
    { url: 'img/phones/banner3.jpg', alt: 'Phone', number: 2 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const timerId = setTimeout(() => {
    setCurrentSlide(current => {
      if (current === sliderImages.length - 1) {
        return 0;
      }

      return current + 1;
    });
  }, 5000);

  const handleButtonClick = (direction: string) => {
    clearInterval(timerId);

    if (direction === 'back') {
      if (currentSlide === 0) {
        setCurrentSlide(sliderImages.length - 1);
      } else {
        setCurrentSlide(current => current - 1);
      }
    }

    if (direction === 'next') {
      if (currentSlide === sliderImages.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(current => current + 1);
      }
    }
  };

  const handleTabClick = (tabNum: number) => {
    clearInterval(timerId);

    if (currentSlide === tabNum) {
      return;
    }

    setCurrentSlide(tabNum);
  };

  return (
    <div className="slider-wrapper">
      <div className="big-slider">
        <div className="big-slider__big-button">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="big-button big-button--prev-button"
            type="button"
            onClick={() => handleButtonClick('back')}
          />
        </div>

        <div className="big__slider images-frame">
          <ul
            className="images-frame__image-list image-list"
          >

            {sliderImages.map(img => (
              <li
                className="image-list__item"
                key={img.alt}
                style={{
                  opacity: currentSlide === img.number ? 1 : 0,
                }}
              >
                <img
                  className="image-list__item__image"
                  src={img.url}
                  alt={img.alt}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="big-slider__big-button">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="big-button big-button--next-button"
            type="button"
            onClick={() => handleButtonClick('next')}
          />
        </div>
      </div>

      <div className="slides-pagination">
        {sliderImages.map(item => (
          <button
            type="button"
            key={item.url}
            className={classNames('slides-pagination__current-slide', {
              'slides-pagination__current-slide--is-active':
                currentSlide === item.number,
            })}
            onClick={() => handleTabClick(item.number)}
          />
        ))}
      </div>
    </div>
  );
};
