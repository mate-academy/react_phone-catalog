import classNames from 'classnames';

import React, { useEffect, useRef } from 'react';
import sliderStyles from './PicturesSlider.module.scss';
import stylesBtn from '@shared/components/ArrowButton/ArrowBtn.module.scss';
import { ArrowButton } from '@shared/components/ArrowButton';
import { useSlider } from '@hooks/useSlider';
import { Link } from 'react-router-dom';

type Slider = {
  id: number;
  mobileImage: string;
  desktopImage: string;
};

type Props = {
  images: Slider[];
};

export const PicturesSlider: React.FC<Props> = ({ images }) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { currentSlide, nextSlide, prevSlide, setCurrentSlide } = useSlider(
    images.length,
    true,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    touchEndX.current = event.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextSlide();
    }

    if (distance < -50) {
      prevSlide();
    }
  };

  return (
    <>
      <div className={sliderStyles.sliderWrapper}>
        <div className={sliderStyles.slider}>
          <ArrowButton
            direction="prev"
            onClick={prevSlide}
            className={classNames(
              stylesBtn.arrowButton,
              stylesBtn.arrowButtonLeft,
            )}
          />

          <div
            className={sliderStyles.viewport}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={sliderStyles.track}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {images.map(slide => (
                <div key={slide.id} className={sliderStyles.slide}>
                  <Link to="/phones">
                    <picture>
                      <source
                        media="(min-width: 640px)"
                        srcSet={slide.desktopImage}
                      />

                      <img
                        src={slide.mobileImage}
                        alt={`Slide ${slide.id}`}
                        className={sliderStyles.image}
                      />
                    </picture>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <ArrowButton
            direction="next"
            onClick={nextSlide}
            className={classNames(
              stylesBtn.arrowButton,
              stylesBtn.arrowButtonRight,
            )}
          />
        </div>
      </div>

      <div className={sliderStyles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={
              currentSlide === index ? sliderStyles.activeDot : sliderStyles.dot
            }
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </>
  );
};
