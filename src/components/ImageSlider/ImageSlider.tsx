import { useEffect, useState } from 'react';
import './ImageSlider.scss';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

const bannersImages = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const ImageSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { length } = bannersImages;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const autoSlide = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(autoSlide);
  });

  return (
    <div className="banner">
      <div className="banner__slider">
        <button
          type="button"
          className="banner__button banner__button--left"
          onClick={prevSlide}
        >
          <ReactSVG
            className="banner__slider-arrow"
            src="img/icons/Chevron (Arrow Left).svg"
          />
        </button>

        <div
          className="banner__slider-box"
        >
          {bannersImages.map((imageUrl, index) => {
            return (
              <div
                className={index === current
                  ? 'banner__slide active'
                  : 'banner__slide'}
                key={imageUrl}
              >
                {index === current && (
                  <img
                    alt="banner"
                    className="banner__slider-img"
                    src={imageUrl}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="banner__button banner__button--right"
          onClick={nextSlide}
        >
          <ReactSVG
            className="banner__slider-arrow"
            src="img/icons/Chevron (Arrow Right).svg"
          />
        </button>
      </div>

      <div className="banner__slide-dots">
        {bannersImages.map((item, index) => (
          <button
            type="button"
            className="banner__slide-button"
            onClick={() => setCurrent(index)}
            key={item}
          >
            <div className={classNames(
              'banner__slide-dot',
              { 'banner__slide-dot--active': index === current },
            )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
