import React, { useEffect, useState } from 'react';
import styles from './HeroCarousel.module.scss';

interface CarouselProps {
  images?: string[];
  step?: number;
  animationDuration?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

type Props = CarouselProps;

const defaultImages: string[] = [
  `${import.meta.env.BASE_URL}/img/banner.png`,
  `${import.meta.env.BASE_URL}/img/banner-tablets.png`,
  `${import.meta.env.BASE_URL}/img/banner-phones.png`,
  `${import.meta.env.BASE_URL}/img/banner-accessories.png`,
];

export const HeroCarousel: React.FC<Props> = ({
  images = defaultImages,
  step = 1,
  animationDuration = 1000,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const extendedImages = [...images, images[0]];
  const maxIndex = images.length;
  const slideWidthPercent = 100 / extendedImages.length;

  const [current, setCurrent] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const activeDotIndex = current % maxIndex;

  const handleNext = () => {
    setWithTransition(true);
    setCurrent(prevValue => prevValue + step);
  };

  const handlePrev = () => {
    setWithTransition(true);
    setCurrent(prevValue =>
      prevValue === 0 ? maxIndex - 1 : prevValue - step,
    );
  };

  const handleDotClick = (index: number) => {
    setWithTransition(true);
    setCurrent(index);
  };

  useEffect(() => {
    if (current >= maxIndex) {
      const timeout = setTimeout(() => {
        setWithTransition(false);
        setCurrent(0);
      }, animationDuration);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [current, maxIndex, animationDuration]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const timerId = setInterval(handleNext, autoPlayInterval);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, autoPlayInterval, step]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <button
          data-cy="prev"
          aria-label="Previous"
          className={styles.button}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>

        <div className={styles.frame}>
          <ul
            className={styles.list}
            style={{
              width: `${extendedImages.length * 100}%`,
              transform: `translateX(-${current * slideWidthPercent}%)`,
              transitionDuration: withTransition
                ? `${animationDuration}ms`
                : '0ms',
            }}
          >
            {extendedImages.map((image, index) => (
              <li
                className={styles.item}
                key={`${image}-${index}`}
                style={{ width: `${100 / extendedImages.length}%` }}
              >
                <img src={image} alt={`Slide ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>

        <button
          data-cy="next"
          aria-label="Next"
          className={styles.button}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>

      <div className={styles.pagination}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
            className={`${styles.dot} ${
              index === activeDotIndex ? styles.dotActive : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};
