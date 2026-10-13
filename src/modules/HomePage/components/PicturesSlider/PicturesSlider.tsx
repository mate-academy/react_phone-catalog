import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { data } from './constants';
import { Dots } from './components/Dots';

export const PicturesSlider = () => {
  const slides = data;
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const changeSlide = (direction = 1) => {
    setSlideIndex(prevIndex => {
      if (prevIndex + direction < 0) {
        return slides.length - 1;
      }

      return (prevIndex + direction) % slides.length;
    });
  };

  const goToSlide = (num: number) => {
    setSlideIndex(num % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSlideIndex(prevIndex => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= slides.length) {
          return 0;
        }

        return nextIndex;
      });
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [slideIndex, slides.length]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.slider}>
        <button
          type="button"
          className={styles.arrow__left}
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          <span className={styles.arrow__left_icon}></span>
        </button>

        <div className={styles.slider__content}>
          <div
            className={styles.slider__viewport}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              className={styles.slider__track}
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {slides.map(slide => (
                <div key={slide.id} className={styles.slider__slide}>
                  <img
                    className={styles.slider__img}
                    src={slide.image}
                    alt={slide.alt}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.arrow__right}
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          <span className={styles.arrow__right_icon}></span>
        </button>
      </div>

      <Dots
        slidesCount={slides.length}
        goToSlide={goToSlide}
        slideIndex={slideIndex}
      />
    </section>
  );
};
