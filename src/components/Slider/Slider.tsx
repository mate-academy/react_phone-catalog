import { useEffect, useState } from 'react';
import cn from 'classnames';

import bannerPhones from '../../images/banner/banner-phones.png';
import bannerTablets from '../../images/banner/banner-tablets.png';
import bannerAaccessories from '../../images/banner/banner-accessories.png';

import './Slider.scss';

const IMG_HEIGHT = 400;
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
    <section className="Page-Slider Slider">
      <div className="Slider-Content">
        <button
          className="Slider-Icon Icon Icon_arrow Icon_arrow_left"
          type="button"
          aria-label="Arrow Left"
          onClick={handleSlideLeft}
        />

        <div className="Slider-Window">
          <div
            className="Slider-Slides"
            style={{
              transform: `TranslateX(${offsetWidth}px)`,
            }}
          >
            <img
              className="Slider-Slide"
              src={bannerPhones}
              alt="Slider banner"
              width={IMG_WIDTH}
              height={IMG_HEIGHT}
              loading="lazy"
              decoding="async"
            />

            <img
              className="Slider-Slide"
              src={bannerTablets}
              alt="Slider banner"
              width={IMG_WIDTH}
              height={IMG_HEIGHT}
              loading="lazy"
              decoding="async"
            />

            <img
              className="Slider-Slide"
              src={bannerAaccessories}
              alt="Slider banner"
              width={IMG_WIDTH}
              height={IMG_HEIGHT}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <button
          className="Slider-Icon Icon Icon_arrow"
          type="button"
          aria-label="Arrow right"
          onClick={handleSlideRight}
        />
      </div>

      <div className="Slider-Dots">
        {[0, 1, 2].map(dotIndex => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <span
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
      </div>
    </section>
  );
};
