import { Link } from 'react-router-dom';
import './PicturesSlider.scss';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { BASE_URL } from '../../helpers/constants';

const slides = [
  { url: `${BASE_URL}/img/banner-phones.jpeg`, title: 'phones' },
  { url: `${BASE_URL}/img/banner-tablets.jpeg`, title: 'tablets' },
  { url: `${BASE_URL}/img/banner-accessories.jpeg`, title: 'accessories' },
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const deltaX = touchStartX.current - currentX;

    if (deltaX > 0) {
      goToNext();
    } else if (deltaX < 0) {
      goToPrevious();
    }

    touchStartX.current = null;
  };

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
                  {slides.map((slide, slideIndex) => (
                    <li
                      className="pictures-slider__item"
                      key={slide.title}
                    >
                      <Link
                        to={`./${slide.title}`}
                        className="pictures-slider__link"
                        style={{ backgroundImage: `url(${slides[slideIndex].url})` }}
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
          {slides.map((slide, slideIndex) => (
            <button
              type="button"
              className="pictures-slider__dot-container"
              key={slide.title}
              onClick={() => goToSlide(slideIndex)}
            >
              <div className={cn('pictures-slider__dot', {
                'pictures-slider__dot--active': currentIndex === slideIndex,
              })}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
