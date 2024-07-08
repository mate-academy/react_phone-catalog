import { useEffect, useState } from 'react';
import './Banner.scss';
import classNames from 'classnames';

const images = [
  { name: 'accessories', src: 'img/banner-accessories.png' },
  { name: 'phones', src: 'img/banner-phones.png' },
  { name: 'tablets', src: 'img/banner-tablets.png' },
];

export const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
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

  useEffect(() => {
    const timerId = setInterval(() => {
      handleRightButton();
    }, 5000);

    return () => clearInterval(timerId);
  }, [currentImageIndex]);

  return (
    <div className="banner">
      <div className="banner__content">
        <h1 className="banner__title title--h1">
          Welcome to Nice Gadgets store!
        </h1>
        <div className="banner__slider">
          <button
            aria-label="previous slide"
            type="button"
            className="banner__button banner__button--left"
            onClick={handleLeftButton}
          />
          <div className="banner__images-container">
            <div
              className="banner__images"
              style={{ transform: `translateX(-${translateValue}%)` }}
            >
              {images.map(image => (
                <img
                  key={image.name}
                  className="banner__image"
                  src={image.src}
                  alt={image.name}
                />
              ))}
            </div>
          </div>
          <button
            aria-label="next slide"
            type="button"
            className="banner__button banner__button--right"
            onClick={handleRightButton}
          />
        </div>
        <div className="banner__dots">
          {images.map((image, i) => (
            <div
              key={image.name}
              className={classNames('banner__dot', {
                'banner__dot--active': i === currentImageIndex,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
