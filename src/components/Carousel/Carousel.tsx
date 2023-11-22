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
  const interval = 3000;
  const images = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png'];

  // Function to handle rotating images
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    ));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    ));
  };

  const rotateImages = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(rotateImages, interval);

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
            // className="favorites-card-buttons__icon icon--favorite"
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
              className={classNames('carousel__img', {
                visible: index === currentIndex,
                hidden: index !== currentIndex,
              })}
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
