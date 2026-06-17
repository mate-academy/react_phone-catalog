import { useEffect, useRef, useState } from 'react';

// import ArrowLeft from './arrow-left.svg?react';
import styles from './Banner.module.scss';
import { asset } from '../../utils/paths';

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      desktop: 'img/banner-iPhone14Pro.png',
      mobile: 'img/banner-tablets-mobile.png',
    },
    {
      desktop: 'img/banner-phones.png',
      mobile: 'img/banner-iPhone14Pro-mobile.png',
    },
    {
      desktop: 'img/banner-tablets.png',
      mobile: 'img/banner-phones-mobile.png',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    const minSwipeDistance = 50; // чутливість

    if (diff > minSwipeDistance) {
      handleNext(); // свайп вліво
    }

    if (diff < -minSwipeDistance) {
      handlePrev(); // свайп вправо
    }
  };

  return (
    <section>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <div className={styles.slider}>
        <button
          type="button"
          className={`${styles.arrowIcon} ${styles.arrowPrev}`}
          onClick={handlePrev}
        ></button>

        <div
          className={styles.banner}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* <div className={styles.bannerInfo}>
            <h2 className={styles.bannerTitle}>Now available in our store!</h2>
            <p className={styles.bannerText}>Be the first!</p>
            <button className={styles.bannerButton}>ORDER NOW</button>
          </div> */}
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={slides[currentSlide].mobile}
            />

            <img
              src={asset(slides[currentSlide].desktop)}
              className={styles.bannerImg}
              alt={`banner-${currentSlide + 1}`}
            />
          </picture>
        </div>

        <button
          type="button"
          className={`${styles.arrowIcon} ${styles.arrowNext}`}
          onClick={handleNext}
        ></button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={index === currentSlide ? styles.activeDot : styles.dot}
          />
        ))}
      </div>
    </section>
  );
};
