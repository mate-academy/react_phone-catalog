import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import './ImagesSlider.scss';

const slidesImagesUrls = [
  './_new/img/banner-phones.png',
  './_new/img/banner-tablets.png',
  './_new/img/banner-accessories.png',
];

export const ImagesSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const offsetStep = 100 / slidesImagesUrls.length;

  const timerId = useRef(0);

  const slidesStyles = {
    width: `${100 * slidesImagesUrls.length}%`,
    transform: `translateX(-${offsetStep * activeSlide}%)`,
  };

  const handleNextClick = () => {
    clearInterval(timerId.current);

    setActiveSlide(prev => {
      return prev + 1 > slidesImagesUrls.length - 1
        ? 0
        : prev + 1;
    });

    timerId.current = window.setInterval(handleNextClick, 5000);
  };

  const handlePrevClick = () => {
    clearInterval(timerId.current);

    setActiveSlide(prev => {
      return prev - 1 < 0
        ? slidesImagesUrls.length - 1
        : prev - 1;
    });

    timerId.current = window.setInterval(handleNextClick, 5000);
  };

  const handleIndicatorClick = (index: number) => {
    clearInterval(timerId.current);
    setActiveSlide(index);
    timerId.current = window.setInterval(handleNextClick, 5000);
  };

  useEffect(() => {
    timerId.current = window.setInterval(handleNextClick, 5000);

    return () => clearInterval(timerId.current);
  }, []);

  return (
    <div className="ImagesSlider">
      <div className="ImagesSlider__wrapper">
        <button
          type="button"
          className="ImagesSlider__button ImagesSlider__button--previous"
          aria-label="Previous"
          onClick={handlePrevClick}
        />

        <div className="ImagesSlider__slides-wrapper">
          <div className="ImagesSlider__slides" style={slidesStyles}>
            {slidesImagesUrls.map((url, index) => (
              <div key={url} className="ImagesSlider__slide">
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="ImagesSlider__slide-image"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="ImagesSlider__button ImagesSlider__button--next"
          aria-label="Next"
          onClick={handleNextClick}
        />
      </div>

      <div className="ImagesSlider__indicators">
        {slidesImagesUrls.map((url, index) => (
          <button
            key={url}
            type="button"
            aria-label="indicator"
            className={classNames('ImagesSlider__indicator', {
              'ImagesSlider__indicator--active': index === activeSlide,
            })}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
