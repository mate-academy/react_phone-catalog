import classNames from 'classnames';
import { useState } from 'react';

import './ImagesSlider.scss';

const slidesImagesUrls = [
  './img/slides/slide-1.png',
  './img/slides/slide-2.png',
  './img/slides/slide-3.png',
];

export const ImagesSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const offsetStep = 100 / slidesImagesUrls.length;

  const slidesStyles = {
    width: `${100 * slidesImagesUrls.length}%`,
    transform: `translateX(-${offsetStep * activeSlide}%)`,
  };

  const handleNextClick = () => {
    setActiveSlide(prev => prev + 1);
  };

  const handlePrevClick = () => {
    setActiveSlide(prev => prev - 1);
  };

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
              <img
                key={url}
                src={url}
                alt={`Slide ${index + 1}`}
                className="ImagesSlider__slide-image"
              />
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
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
