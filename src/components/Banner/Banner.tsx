/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useState } from 'react';
import './Banner.scss';

const Banner: React.FC = () => {
  const images = [
    './img/banner-phones.png',
    './img/banner-tablets.png',
    './img/banner-accessories.png',
  ];
  const step = 1;
  const frameSize = 1;
  const itemWidth = 1040;
  const animationDuration = 1000;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxCurrentImage = images.length - frameSize;

  const nextImage = () => {
    if (currentImageIndex !== maxCurrentImage) {
      setCurrentImageIndex((prevIndex) => Math.min(prevIndex + step, maxCurrentImage));
    } else {
      setCurrentImageIndex(0);
    }
  };

  const prevImage = () => {
    if (currentImageIndex !== 0) {
      setCurrentImageIndex((prevIndex) => Math.max(prevIndex - step, 0));
    } else {
      setCurrentImageIndex(maxCurrentImage);
    }
  };

  return (
    <div className="banner">
      <div className="banner__container">
        <button type="button" onClick={prevImage} className="banner__button">
          {'<'}
        </button>
        <ul
          className="banner__list"
          style={{
            width: `${itemWidth}px`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              className="banner__item"
              style={{
                transform: `translateX(${-currentImageIndex * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={(index + 1).toString()}
                width={itemWidth}
                className="banner__image"
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={nextImage} className="banner__button">
          {'>'}
        </button>
      </div>
      <div className="banner__pagination">
        {images.map((image, index) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            key={image}
            type="button"
            onClick={() => setCurrentImageIndex(index)}
            className={classNames('banner__indicator', {
              'banner__indicator--active': currentImageIndex === index,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
