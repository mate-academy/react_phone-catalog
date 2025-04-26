import { useState, useEffect, useRef, useCallback } from 'react';
import './SliderPictures.scss';
import '../ButtonNextPrev.scss';
import img3 from '../../../../img/photo3.png';
import img4 from '../../../../img/photo4.png';
import img1 from '../../../../img/photo1.webp';
import img2 from '../../../../img/photo2.webp';
import classNames from 'classnames';

const images = [img1, img2, img3, img4];

export const SliderPictures = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prevIndex =>
        prevIndex === 1 ? images.length : prevIndex - 1,
      );
    }
  }, [isTransitioning]);

  const handleNextClick = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prevIndex =>
        prevIndex === images.length ? 1 : prevIndex + 1,
      );
    }
  }, [isTransitioning]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      const transitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
          setCurrentIndex(images.length);
        } else if (currentIndex === images.length + 1) {
          setCurrentIndex(1);
        }
      };

      slider.addEventListener('transitionend', transitionEnd);

      return () => {
        slider.removeEventListener('transitionend', transitionEnd);
      };
    }

    return () => {};
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isTransitioning) {
        handleNextClick();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isTransitioning, handleNextClick]);

  const buttonClassPrev =
    'slider__button--pictures slider__button slider__button--prev';
  const buttonClassNext =
    'slider__button--pictures slider__button slider__button--next';

  return (
    <div className="container--s">
      <div className="slider">
        <div className="slider__button__container">
          <button
            className={buttonClassPrev}
            onClick={handlePrevClick}
          ></button>
        </div>

        <div className="slider__content">
          <div
            ref={sliderRef}
            className="slider__wrapper"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning
                ? 'transform 0.5s ease-in-out'
                : 'none',
            }}
          >
            {[images[images.length - 1], ...images, images[0]].map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="slider__image"
                />
              ),
            )}
          </div>
        </div>

        <div className="slider__button__container">
          <button
            className={buttonClassNext}
            onClick={handleNextClick}
          ></button>
        </div>
      </div>

      <div className="all-block">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setCurrentIndex(index + 1);
              }
            }}
            className={classNames('block', {
              'block--active': index === currentIndex - 1,
            })}
          />
        ))}
      </div>
    </div>
  );
};
