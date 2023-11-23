/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './Carousel.scss';
import rightArrow from '../../icons/right-arrow.svg';
import leftArrow from '../../icons/left-arrow.svg';
import { mainURL } from '../../utils/mainUrl';

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 5000;
  const [itemWidth, setItemWidth] = useState(0);
  const images = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png'];

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 980) {
        setItemWidth(520);
      } else if (windowWidth < 1200) {
        setItemWidth(780);
      } else {
        setItemWidth(1040);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goToNext = () => {
    const lastIndex = images.length - 1;

    setCurrentIndex((prevIndex) => (
      prevIndex + 1 > lastIndex ? lastIndex : prevIndex + 1
    ));

    if (currentIndex === lastIndex) {
      setCurrentIndex(0);
    }
  };

  const goToPrevious = () => {
    const lastIndex = images.length - 1;

    setCurrentIndex((prevIndex) => (
      prevIndex - 1 > 0 ? prevIndex - 1 : 0
    ));

    if (currentIndex === 0) {
      setCurrentIndex(lastIndex);
    }
  };

  useEffect(() => {
    const timer = setInterval(goToNext, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button
          type="button"
          className="carousel__button button"
          onClick={() => goToPrevious()}
        >
          <img
            src={leftArrow.toString()}
            alt="Favorites"
          />
        </button>

        <div className="carousel__slider">
          {images.map((image, index) => (
            <img
              key={image}
              src={`${mainURL}/${image}`}
              alt={`Imag ${index}`}
              className="carousel__img"
              style={{
                transform: `translateX(-${currentIndex * itemWidth}px)`,
                transition: '1000ms',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel__button button"
          onClick={() => goToNext()}
        >
          <img
            className="carousel__button-img"
            src={rightArrow.toString()}
            alt="Favorites"
          />
        </button>
      </div>
      <div className="carousel__dots">
        {images.map((image, index) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <button
            key={image}
            type="button"
            className={classNames('carousel__dot', {
              'carousel__dot--active': index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
