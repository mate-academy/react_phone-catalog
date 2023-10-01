import { useEffect, useState } from 'react';
import classNames from 'classnames';

import './slider.scss';

import { Button } from '../../UI/Button';
import { Slide } from '../../../types/Slide';
import { BASE_URL } from '../../../utils/httpClient';

type Props = {
  slides: Slide[],
  autoPlayTime?: number,
};

export const Slider: React.FC<Props> = ({
  slides,
}) => {
  const [curSlide, setCurSlide] = useState(slides[0]);
  const curSlideIndex = slides.indexOf(curSlide);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (curSlideIndex + direction < 0) {
      slideNumber = slides.length - 1;
    } else {
      slideNumber = (curSlideIndex + direction) % slides.length;
    }

    setCurSlide(slides[slideNumber]);
  };

  const handleRightShift = () => {
    changeSlide(1);
  };

  const handleLeftShift = () => {
    changeSlide(-1);
  };

  const goToSlide = (slideIndex: number): void => {
    if (slideIndex === curSlideIndex) {
      return;
    }

    setCurSlide(slides[slideIndex % slides.length]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 5000);

    return (() => {
      clearInterval(interval);
    });
  }, [curSlide]);

  return (
    <section
      className="slider"
    >
      <div className="slider__base">
        <Button
          handleClick={handleLeftShift}
          style={{ height: '100%' }}
          disabled={false}
          imgName="LeftArrow"
        />

        <div className="slider__screen">
          <div
            style={
              { transform: `translateX(-${curSlideIndex * 100}%)` }
            }
            className="slider__list"
          >
            {slides.map(slide => (
              <div
                key={slide.id}
                className="slider__slide"
              >
                <img
                  src={`${BASE_URL}/img/${slide.imgName}`}
                  alt={slide.imgName}
                  className="slider__image"
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          handleClick={handleRightShift}
          style={{ height: '100%' }}
          disabled={false}
          imgName="RightArrow"
        />
      </div>

      <div className="slider__dots">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(i)}
            type="button"
            aria-label={`Go to slide ${i}`}
            className={classNames(
              'slider__dot',
              { 'slider__dot--active': slide.id === curSlide.id },
            )}
          />
        ))}
      </div>
    </section>
  );
};
