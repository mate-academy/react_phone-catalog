import { useState, useEffect, useCallback } from 'react';
import './PicturesSlider.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { picturesSliderData } from '../../constants';

export const PicturesSlider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const nextSliderImage = useCallback(() => {
    const nextIndex = (sliderIndex + 1) % picturesSliderData.length;

    setSliderIndex(nextIndex);
  }, [sliderIndex]);

  const prevSliderImage = () => {
    setSliderIndex(
      sliderIndex === 0 ? picturesSliderData.length - 1 : sliderIndex - 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSliderImage, 5000);

    return () => clearInterval(interval);
  }, [sliderIndex, nextSliderImage]);

  return (
    <div className="slider">
      <div className="slider__top">
        <button
          className="slider__slide-btn"
          type="button"
          onClick={prevSliderImage}
          aria-label="previous slider image"
        >
          <i className="ico ico-left-dark" />
        </button>

        <div className="slider__images">
          {picturesSliderData.map(el => (
            <Link to={el.linkUrl} key={el.linkUrl} className="slider__link">
              <img
                src={el.imgUrl}
                alt={el.linkUrl}
                className="slider__image"
                style={{
                  translate: ` ${-100 * sliderIndex}%`,
                }}
              />
            </Link>
          ))}
        </div>

        <button
          className="slider__slide-btn"
          type="button"
          onClick={nextSliderImage}
          aria-label="next slider image"
        >
          <i className="ico ico-right-dark" />
        </button>
      </div>

      <div className="slider__buttons">
        {picturesSliderData.map((url, index) => (
          <button
            key={url.imgUrl}
            type="button"
            className={cn('slider__button', {
              active: sliderIndex === index,
            })}
            onClick={() => setSliderIndex(index)}
            aria-label="change slider image btn"
          />
        ))}
      </div>
    </div>
  );
};
