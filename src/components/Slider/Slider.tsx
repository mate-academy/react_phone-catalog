import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import className from 'classnames';
import { SliderImg } from '../../helpers/slidersImg';

export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? SliderImg.length - 1
      : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isFirstSlide = currentIndex === SliderImg.length - 1;
    const newIndex = isFirstSlide
      ? 0
      : currentIndex + 1;

    setCurrentIndex(newIndex);
  }, [currentIndex, SliderImg]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [goToNext]);

  return (
    <section className="slider homePage__slider">
      <div className="slider__wrapper">
        <div className="slider__photoBlock">
          <div className="slider__arrowLeft">
            <button
              type="button"
              className="slider__button"
              onClick={goToPrevious}
            >
              <img src="./images/icons/ArrowLeft.svg" alt="ArrowLeft" />
            </button>
          </div>

          <div className="slider__photosWrap">
            <div
              className="slider__photos"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {SliderImg.map(slide => (
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="slider__img"
                />
              ))}
            </div>
          </div>

          <div className="slider__arrowRight">
            <button
              type="button"
              className="slider__button"
              onClick={goToNext}
            >
              <img
                src="./images/icons/ArrowRight.svg"
                alt="ArrowRight"
              />
            </button>
          </div>
        </div>

        <div className="slider__switchers">
          {SliderImg.map((slide) => (
            <button
              type="button"
              key={slide.id}
              className={className(
                'slider__switch',
                { 'slider__switch--selected': slide.id === currentIndex },
              )}
              onClick={() => setCurrentIndex(slide.id)}
              aria-label={`Go to slide ${slide.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
