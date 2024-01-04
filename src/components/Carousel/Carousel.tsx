/* eslint-disable global-require */
import './Carousel.scss';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

const images = [
  require('../../assets/banners/banner-phones.png'),
  require('../../assets/banners/banner-tablets.png'),
  require('../../assets/banners/banner-accessories.png'),
];

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const lastIndex = images.length - 1;
  const banner = useRef<HTMLDivElement>(null);
  const transformValue = sliderWidth * currentIndex;

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, [currentIndex]);

  const handlePrevSlide = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(lastIndex);
    }
  };

  const handleNextSlide = () => {
    if (currentIndex !== lastIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="carousel">
      <div className="carousel__slider">
        <button
          type="button"
          aria-label="button"
          className="carousel__slider-button"
          onClick={handlePrevSlide}
        >
          <div className="icon icon-left" />
        </button>

        <div className="carousel__slider-container" ref={banner}>
          <ul
            className="carousel__slider-list"
            style={{
              transform: `translateX(${-transformValue}px)`,
            }}
          >
            {images.map(image => (
              <li key={image} className="carousel__slider-item">
                <img
                  src={image}
                  alt="Banner"
                  className="carousel__slider-image"
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          aria-label="button"
          className="carousel__slider-button"
          onClick={handleNextSlide}
        >
          <div className="icon icon-right" />
        </button>
      </div>

      <div className="carousel__dots">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            aria-label="dots"
            className={classNames('carousel__dots-item', {
              'banner-active': currentIndex === i,
            })}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};
