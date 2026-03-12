import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './BannerSlider.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { useSwipe } from '../../../hooks/useSwipe';

const imagesOnMobile = [
  'img/banner-mobile-1.png',
  'img/banner-mobile-2.png',
  'img/banner-mobile-3.png',
];
const imagesOnTablet = [
  'img/banner-tablet-1.png',
  'img/banner-tablet-2.png',
  'img/banner-tablet-3.png',
];

export const BannerSlider = () => {
  const width = useWindowWidth();
  const images = width >= 640 ? imagesOnTablet : imagesOnMobile;

  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const extendedImages = useMemo(
    () => [images[images.length - 1], ...images, images[0]],
    [images],
  );

  const next = () => setIndex(p => p + 1);
  const prev = () => setIndex(p => p - 1);

  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
  });

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      next();
    }, 5000);

    return () => clearTimeout(timeoutRef.current!);
  }, [index]);

  useEffect(() => {
    if (index === extendedImages.length - 1) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(1);
      }, 800);
    } else if (index === 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(images.length);
      }, 800);
    } else {
      setIsAnimating(true);
    }
  }, [index, extendedImages, images.length]);

  const activeIndex =
    index === 0
      ? images.length - 1
      : index === extendedImages.length - 1
        ? 0
        : index - 1;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className={styles.arrowLeft} onClick={prev}>
          <img src="img/icons/arrow-left.svg" alt="left" />
        </button>
        <div className={styles.imageWrapper}>
          <div
            className={styles.imagesRow}
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: isAnimating ? 'transform 0.8s ease' : 'none',
            }}
          >
            {extendedImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`banner-${i}`}
                className={styles.image}
              />
            ))}
          </div>
        </div>
        <button className={styles.arrowRight} onClick={next}>
          <img src="img/icons/arrow-right.svg" alt="right" />
        </button>
      </div>
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={i === activeIndex ? styles.dotActive : styles.dot}
            onClick={() => setIndex(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};
