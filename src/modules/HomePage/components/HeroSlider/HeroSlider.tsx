import styles from './HeroSlider.module.scss';
import { slides } from './slides';
import { useState } from 'react';

export const HeroSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const goToSlide = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex);
  };

  return (
    <section
      className={styles.heroSlider}
      aria-label="Featured products"
      aria-roledescription="carousel"
    >
      <div className={styles.heroSlider__viewport}>
        <div
          className={styles.heroSlider__track}
          style={{
            transform: `translateX(-${currentSlideIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className={styles.heroSlider__slide}
              aria-hidden={currentSlideIndex !== index}
            >
              <h2 className={styles.heroSlider__heading}>{slide.heading}</h2>

              <div className={styles.heroSlider__product}>
                <h3 className={styles.heroSlider__productName}>
                  {slide.productName}
                </h3>

                <p className={styles.heroSlider__tagline}>{slide.tagline}</p>

                <div className={styles.heroSlider__imageContainer}>
                  <img
                    className={styles.heroSlider__image}
                    src={slide.image}
                    alt={slide.imageAlt}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className={styles.heroSlider__indicators}
        aria-label="Choose a slide"
      >
        {slides.map((slide, index) => {
          const isActive = currentSlideIndex === index;

          return (
            <button
              key={slide.id}
              className={`${styles.heroSlider__indicator} ${
                isActive ? styles['heroSlider__indicator--active'] : ''
              }`}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
            />
          );
        })}
      </div>
    </section>
  );
};
