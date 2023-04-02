import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import './slider.scss';
import { sliderImgs } from '../../data/data';

export const Slider = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const slide = useRef<HTMLDivElement>(null);

  const slideNext = () => {
    const nextIndex = (currIndex + 1) % sliderImgs.length;

    setCurrIndex(nextIndex);

    if (wrapper.current && slide.current) {
      const slideWidth = slide.current.clientWidth;

      wrapper.current.style.transform = `translateX(-${nextIndex * slideWidth}px)`;
    }
  };

  const slidePrev = () => {
    const prevIndex = (currIndex - 1 + sliderImgs.length) % sliderImgs.length;

    setCurrIndex(prevIndex);

    if (wrapper.current && slide.current) {
      const slideWidth = slide.current.clientWidth;

      wrapper.current.style.transform = `translateX(-${prevIndex * slideWidth}px)`;
    }
  };

  useEffect(() => {
    const timer = setTimeout(slideNext, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currIndex]);

  return (
    <div className="slider">
      <div
        aria-hidden="true"
        className="slider__button--prev"
        onClick={slidePrev}
        onKeyDown={slidePrev}
      />

      <div className="slider__content">
        <div ref={wrapper} className="slider__wrapper">
          {sliderImgs.map((photo, index) => (
            <div
              ref={slide}
              key={photo.id}
              className={classNames(
                'slider__slide',
                { 'slider__slide--active': index === currIndex },
              )}
              style={{ backgroundImage: `url(${photo.url})` }}
            />
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="slider__button--next"
        onClick={slideNext}
        onKeyDown={slideNext}
      />

      <div className="slider__navigation">
        {sliderImgs.map((item, index) => (
          <div
            aria-hidden="true"
            key={item.id}
            className={classNames(
              'slider__dot',
              { 'slider__dot--active': sliderImgs[currIndex].id === item.id },
            )}
            onClick={() => setCurrIndex(index)}
            onKeyDown={() => setCurrIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
