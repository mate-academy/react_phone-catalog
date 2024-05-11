import { Link } from 'react-router-dom';
import { useSwipe } from '../../hooks/useSwipe';
import './Banner.scss';
import { useState } from 'react';
import classNames from 'classnames';

const slides = [
  {
    image: './img/banner-images/banner-phones.png',
    link: '/phones',
  },
  {
    image: './img/banner-images/banner-tablets.png',
    link: '/tablets',
  },
  {
    image: './img/banner-images/banner-accessories.png',
    link: '/accessories',
  },
];

export const Banner = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleMoveSlidesLeft = () => {
    setCurrentSlideIndex(prevIndex =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const handleMoveSlidesRight = () => {
    setCurrentSlideIndex(prevIndex =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const elementRef = useSwipe(handleMoveSlidesLeft, handleMoveSlidesRight);

  return (
    <div className="banner">
      <div className="carousel">
        <button
          className="carousel__button carousel__button--left"
          onClick={handleMoveSlidesLeft}
        />

        <div className="carousel__container" ref={elementRef}>
          {slides.map((slide, index) => (
            <Link to={slide.link} key={slide.image}>
              <img
                className={classNames('container__slide', {
                  'container__slide--active': index === currentSlideIndex,
                })}
                src={slide.image}
              />
            </Link>
          ))}
        </div>

        <button
          onClick={handleMoveSlidesRight}
          className="carousel__button carousel__button--right"
        />
      </div>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <img
            key={index}
            src={
              index === currentSlideIndex
                ? './img/icons-image/icon-count-active.svg'
                : './img/icons-image/icon-count-not-active.svg'
            }
          />
        ))}
      </div>
    </div>
  );
};
