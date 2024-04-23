import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';

import './Slider.scss';

export const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = Object.values(Category);

  const handleMoveLeft = () => {
    setActiveIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  const handleMoveRight = () => {
    setActiveIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleButtonDownClick = (index: number): void => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleMoveRight();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="slider">
      <div className="slider__img-block">
        <button
          type="button"
          aria-label="previous slide"
          className="slider__button move-left"
          onClick={handleMoveLeft}
        />
        <div className="slider__photo">
          {banners.map((category, index) => (
            <Link
              to={`./${category}`}
              key={category}
              className={`slider__item ${index === activeIndex ? 'active-img' : ''}`}
            >
              <img
                src={`img/banner-${category}${window.innerWidth <= 640 ? '-mini' : ''}.jpg`}
                alt={`Slide ${index + 1}`}
                className="slider__image"
              />
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label="button"
          className="slider__button move-right"
          onClick={handleMoveRight}
        />
      </div>
      <div className="slider slider__buttons">
        {banners.map((category, index) => (
          <button
            type="button"
            aria-label="button"
            className={`slider__button-down ${activeIndex === index ? 'is-active' : ''}`}
            onClick={() => handleButtonDownClick(index)}
            key={category}
          />
        ))}
      </div>
    </div>
  );
};
