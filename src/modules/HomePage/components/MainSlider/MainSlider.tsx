import cn from 'classnames';
import styles from './MainSlider.module.scss';
import { SvgIcon } from '../../../../components/SvgIcon';
import { useEffect, useState, TouchEvent } from 'react';

const slides = [
  'img/banner-accessories.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

interface Props {
  className: string;
}

export const MainSlider: React.FC<Props> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (startX === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
      handlePrev(); // Swipe right
    } else if (deltaX < -50) {
      handleNext(); // Swipe left
    }

    setStartX(null);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className={cn(styles['main-slider'], className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles['main-slider__container']}>
        <button
          onClick={handlePrev}
          className={cn(
            styles['main-slider__controller'],
            styles['main-slider__controller--prev'],
          )}
        >
          <SvgIcon type="arrow" />
        </button>

        <ul className={styles['main-slider__list']}>
          {slides.map((slide, index) => (
            <li
              className={styles['main-slider__slide']}
              key={slide}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <img
                className={styles['main-slider__img']}
                src={slide}
                alt={`Slide ${index + 1}`}
              />
            </li>
          ))}
        </ul>

        <button
          onClick={handleNext}
          className={cn(
            styles['main-slider__controller'],
            styles['main-slider__controller--next'],
          )}
        >
          <SvgIcon type="arrow" />
        </button>
      </div>

      <div className={styles['main-slider__dots']}>
        {slides.map((_, index) => {
          const isActive = index === currentSlide;

          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(styles['main-slider__dot'], {
                [styles['main-slider__dot--active']]: isActive,
              })}
            />
          );
        })}
      </div>
    </section>
  );
};
