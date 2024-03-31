import { Link } from 'react-router-dom';
import './PicturesSlider.scss';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { BASE_URL, CATEGORIES } from '../../helpers/constants';
import { useSwipe } from '../../helpers/useSwipe';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === CATEGORIES.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? CATEGORIES.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const { handleTouchStart, handleTouchMove } = useSwipe(
    goToNext, goToPrevious,
  );

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [goToNext]);

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__content">
        <div className="grid grid--tablet">
          <div className="
              pictures-slider__arrow-container
              grid__item
              grid__item--tablet-1-1"
          >
            <button
              type="button"
              className="pictures-slider__arrow"
              onClick={goToPrevious}
            >
              <div className="icon icon--arrow-left" />
            </button>
          </div>

          <div className="
                  grid__item
                  grid__item--tablet-2-11
                  grid__item--desktop-2-23"
          >
            <div
              className="pictures-slider__slides-container"
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div className="pictures-slider__slides">
                <ul
                  className="pictures-slider__list"
                  style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                >
                  {CATEGORIES.map((category) => (
                    <li
                      className="pictures-slider__item"
                      key={category}
                    >
                      <Link
                        to={`./${category}`}
                        className="pictures-slider__link"
                        style={{ backgroundImage: `url(${BASE_URL}/img/banner-${category}.jpeg)` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="
                pictures-slider__arrow-container
                grid__item
                grid__item--tablet-12-12
                grid__item--desktop-24-24"
          >
            <button
              type="button"
              className="pictures-slider__arrow"
              onClick={goToNext}
            >
              <div className="icon icon--arrow-right" />
            </button>
          </div>
        </div>

        <div className="pictures-slider__dots">
          {CATEGORIES.map((category, categoryIndex) => (
            <button
              type="button"
              className="pictures-slider__dot-container"
              key={category}
              onClick={() => goToSlide(categoryIndex)}
            >
              <div className={cn('pictures-slider__dot', {
                'pictures-slider__dot--active': currentIndex === categoryIndex,
              })}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
