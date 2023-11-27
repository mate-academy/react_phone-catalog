import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './slider.scss';
import { sliderImgs } from '../../data/data';
import { Button } from '../Button';
import { SliderNav } from '../SliderNav/SliderNav';

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
      <Button
        width="32px"
        height=""
        handler={slidePrev}
      >
        <img src="./img/icons/arrowLeft.svg" alt="prev" />

      </Button>

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

      <Button
        width="32px"
        height=""
        handler={slideNext}
      >
        <img src="./img/icons/arrowRight.svg" alt="next" />

      </Button>

      <SliderNav
        currentIndex={currIndex}
        onSlideChange={setCurrIndex}
      />
    </div>
  );
};
