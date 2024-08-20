import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import classNames from 'classnames';

import './Slider.scss';

export const Slider = () => {
  const banners = Object.values(Category);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const handleLeftButton = () => {
    const index = currentImageIndex - 1 >= 0 ? currentImageIndex - 1 : 2;

    setCurrentImageIndex(index);
    setTranslateValue(33.33 * index);
  };

  const handleRightButton = () => {
    const index = currentImageIndex + 1 <= 2 ? currentImageIndex + 1 : 0;

    setCurrentImageIndex(index);
    setTranslateValue(33.33 * index);
  };

  const handleButtonDownClick = (index: number): void => {
    setCurrentImageIndex(index);
    setTranslateValue(33.33 * index);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      handleRightButton();
    }, 5000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex]);

  return (
    <div className="slider">
      <div className="slider__content">
        <div className="slider__box">
          <button
            aria-label="previous slide"
            type="button"
            className="slider__button slider__button--left"
            onClick={handleLeftButton}
          />
          <div className="slider__images-container">
            <div
              className="slider__images"
              style={{ transform: `translateX(-${translateValue}%)` }}
            >
              {banners.map((category, index) => (
                <Link
                  to={`./${category}`}
                  key={category}
                  className="slider__link"
                >
                  <img
                    src={`img/banner-${category}${window.innerWidth <= 640 ? '-mini' : ''}.jpg`}
                    alt={`Slide ${index + 1}`}
                    className="slider__image"
                  />
                </Link>
              ))}
            </div>
          </div>
          <button
            aria-label="next slide"
            type="button"
            className="slider__button slider__button--right"
            onClick={handleRightButton}
          />
        </div>
        <div className="slider__dots">
          {banners.map((category, index) => (
            <button
              type="button"
              aria-label="button"
              className={classNames('slider__dot', {
                'slider__dot--active': index === currentImageIndex,
              })}
              onClick={() => handleButtonDownClick(index)}
              key={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
