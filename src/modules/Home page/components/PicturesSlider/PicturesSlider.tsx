import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth?: number;
  animationDuration: number;
  infinite: boolean;
};

export const PicturesSlider: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth = 0,
  animationDuration,
  infinite,
}) => {
  const [itemWidthState, setItemWidthState] = useState(itemWidth);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const width = viewportRef.current.offsetWidth;

        setItemWidthState(width / frameSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [frameSize]);

  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = infinite ? images.length : images.length - frameSize;

  const handleNext = () => {
    setActiveIndex(prev =>
      infinite
        ? (prev + step) % images.length
        : Math.min(prev + step, maxIndex),
    );
  };

  const handlePrev = () => {
    setActiveIndex(prev =>
      infinite
        ? (prev - step + images.length) % images.length
        : Math.max(prev - step, 0),
    );
  };

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);

    return () => clearInterval(interval);
  }, [images.length, step, infinite]);

  const translateX = activeIndex * itemWidthState;

  // Swipe functionality
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) {
      return;
    }

    const deltaX = e.touches[0].clientX - startX;

    // Threshold for swipe detection
    if (deltaX > 50) {
      handlePrev();
      setStartX(null);
    } else if (deltaX < -50) {
      handleNext();
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  return (
    <div className={styles['full-width-wrapper']}>
      <div
        className={styles.Carousel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={handlePrev}
          className={classNames(styles.Carousel__button, {
            [styles.disabled]: !infinite && activeIndex === 0,
          })}
        >
          <img
            src="./img/buttons/left-arrow.svg"
            alt="arrow-left"
            className={styles.Carousel__arrow}
          />
        </button>
        <div ref={viewportRef} className={styles.Carousel__viewport}>
          <ul
            className={styles.Carousel__list}
            style={{
              transform: `translateX(-${translateX}px)`,
              transition: `transform ${animationDuration}ms ease`,
              width: `${images.length * itemWidthState}px`,
              maxWidth: '100%',
            }}
          >
            {images.map((image, index) => (
              <li
                key={index}
                className={styles.Carousel__item}
                style={{ width: `${itemWidthState}px` }}
              >
                {index === 0 ? (
                  <picture>
                    <source
                      srcSet="./img/banner-for-phones.svg"
                      media="(max-width: 640px)"
                    />
                    <img
                      src={image}
                      alt="product"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </picture>
                ) : (
                  <img
                    className={styles.Carousel__img}
                    src={image}
                    alt={`Slide ${index}`}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className={classNames(styles.Carousel__button, {
            [styles.disabled]: !infinite && activeIndex >= maxIndex,
          })}
        >
          <img
            src="./img/buttons/right-arrow.svg"
            alt="right-arrow"
            className={styles.Carousel__arrow}
          />
        </button>
        <div className={styles.Carousel__dots}>
          {images.map((_, index) => (
            <div
              key={index}
              className={styles.Carousel__dot_container}
              onClick={() => setActiveIndex(index)}
            >
              <button
                type="button"
                className={classNames(styles.Carousel__dot, {
                  [styles.Carousel__dot_active]: activeIndex === index,
                })}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
