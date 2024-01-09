import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Slide } from '../Slide/Slide';
import { SliderData } from '../../utils/SliderData';

import './Slider.scss';

const IMG_WIDTH = 1040;
const IMG_TOTAL = 3;
const SLIDE_WINDOW = IMG_WIDTH;
const MIN_OFFSET = 0;
const MAX_OFFSET = -SLIDE_WINDOW * (IMG_TOTAL - 1);
const TIME_OUT = 5000;

export const Slider = () => {
  const [offsetWidth, setOffsetWidth] = useState(0);

  const isFirstSlide = offsetWidth === MIN_OFFSET;
  const isLastSlide = offsetWidth === MAX_OFFSET;

  const handleSlideLeft = () => {
    setOffsetWidth(currentOffset => {
      if (isFirstSlide) {
        return MAX_OFFSET;
      }

      return currentOffset + SLIDE_WINDOW;
    });
  };

  const handleSlideRight = () => {
    setOffsetWidth(currentOffset => {
      if (isLastSlide) {
        return MIN_OFFSET;
      }

      return currentOffset - SLIDE_WINDOW;
    });
  };

  const isDotActive = (dotIndex: number) => {
    return Math.abs(offsetWidth / SLIDE_WINDOW) === dotIndex;
  };

  useEffect(() => {
    const intervalID = window.setInterval(() => {
      handleSlideRight();
    }, TIME_OUT);

    return () => {
      window.clearInterval(intervalID);
    };
  }, [offsetWidth]);

  return (
    <div className="Slider">
      <div className="Slider-Content">
        <button
          className="Slider-Icon Icon Icon_arrow Icon_arrow_left"
          type="button"
          aria-label="Arrow Left"
          onClick={handleSlideLeft}
        />

        <div className="Slider-Window">
          <ul
            className="Slider-Slides"
            style={{
              transform: `TranslateX(${offsetWidth}px)`,
            }}
          >
            {SliderData.map(({ linkPath, imagePath }) => (
              <Slide
                linkPath={linkPath}
                imagePath={imagePath}
                key={linkPath}
              />
            ))}
          </ul>
        </div>

        <button
          className="Slider-Icon Icon Icon_arrow"
          type="button"
          aria-label="Arrow right"
          onClick={handleSlideRight}
        />
      </div>

      <ul className="Slider-Dots">
        {[0, 1, 2].map(dotIndex => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            key={dotIndex}
            className={cn(
              'Slider-Dot',
              {
                'Slider-Dot_active': isDotActive(dotIndex),
              },
            )}
            onClick={() => {
              setOffsetWidth(-dotIndex * SLIDE_WINDOW);
            }}
          />
        ))}
      </ul>
    </div>
  );
};
