import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './BannerSlider.scss';

const BannerImages = [
  'img/Banner1.jpg',
  'img/Banner2.jpg',
  'img/Banner3.jpg',
];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => prev + 1),
      5000,
    );

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="banner">
      <div className="banner__container">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="banner__button banner__button--prev"
        >
          <img src="./img/ArrowLeft.svg" alt="arrowLeft" />
        </button>
        <div className="banner__images">
          {BannerImages.map((image, index) => {
            if (currentIndex > BannerImages.length - 1) {
              setCurrentIndex(0);
            }

            if (currentIndex < 0) {
              setCurrentIndex(BannerImages.length - 1);
            }

            return (
              <img
                src={image}
                alt={image}
                key={image}
                className={classNames('banner__image', {
                  'banner__image--active': index === currentIndex,
                })}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="banner__button banner__button--next"
        >
          <img src="./img/ArrowRight.svg" alt="arrowRigth" />
        </button>
      </div>
      <div className="banner__pagination-container">
        {BannerImages.map((image, index) => (
          <button
            key={image}
            aria-label="banner__pagination"
            type="button"
            className={classNames('banner__button-pg', {
              'banner__button-pg--active': index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
