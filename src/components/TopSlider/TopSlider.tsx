/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../../images-style/images';

const TOP_SLIDER_IMAGES = [
  IMAGES['banner-phones'],
  IMAGES['banner-tablets'],
  IMAGES['banner-accessories'],
];

export const HomePageTopSlider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>(setInterval(() => {}, 0));

  const ShowPrevSlide = () => {
    if (sliderIndex === 0) {
      setSliderIndex(2);
    } else if (sliderIndex > 0) {
      setSliderIndex(index => index - 1);
    }

    ResetTime();
  };

  const ShowNextSlide = () => {
    if (sliderIndex === 2) {
      setSliderIndex(0);
    } else if (sliderIndex < 2) {
      setSliderIndex(index => index + 1);
    }

    ResetTime();
  };

  const ResetTime = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(ShowNextSlide, 5000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(ShowNextSlide, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [sliderIndex]);

  return (
    <div className="top-slider">
      <div className="top-slider__top">
        <button
          type="button"
          onClick={ShowPrevSlide}
          className="top-slider__button"
        />

        <div className="top-slider__pictures">
          {TOP_SLIDER_IMAGES.map((sliderEL) => (
            <img
              style={{ translate: `${-100 * sliderIndex}%` }}
              src={sliderEL}
              alt={`${sliderEL}`}
              key={sliderEL}
              className="top-slider__picture"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={ShowNextSlide}
          className="top-slider__button top-slider__button--right"
        />
      </div>

      <div className="top-slider__bottom">
        <div className="top-slider__dot-container">
          {TOP_SLIDER_IMAGES.map((sliderEL, imageIndex) => (
            <div
              key={`${sliderEL}-dot`}
              className={classNames('top-slider__dot',
                { 'top-slider__dot-active': imageIndex === sliderIndex })}
              onClick={() => setSliderIndex(imageIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
