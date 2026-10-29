import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';

const SLIDES = [
  {
    image: 'img/banner-phones-desktop.png',
    mobileImage: 'img/banner-phones-mobile.png',
    to: '/phones',
    alt: 'Now available in our store! iPhone 14 Pro. Be the first!',
  },
  { image: 'img/banner-tablets.png', to: '/tablets', alt: 'Tablets' },
  {
    image: 'img/banner-accessories.png',
    to: '/accessories',
    alt: 'Accessories',
  },
];

const DELAY = 5000;

const scrollToSlide = (track: HTMLElement, target: number) => {
  track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' });
};

export const PicturesSlider = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (target: number) => {
    if (trackRef.current) {
      scrollToSlide(trackRef.current, target);
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;

    if (track) {
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (trackRef.current) {
        scrollToSlide(trackRef.current, (index + 1) % SLIDES.length);
      }
    }, DELAY);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className={styles.slider} aria-label="Promotions">
      <div className={styles.main}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Previous picture"
          onClick={() => goTo((index - 1 + SLIDES.length) % SLIDES.length)}
        >
          <img src="img/icons/arrow-left.svg" alt="" width="16" height="16" />
        </button>

        <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
          {SLIDES.map(slide => (
            <Link key={slide.to} to={slide.to} className={styles.slide}>
              <picture className={styles.picture}>
                {slide.mobileImage && (
                  <source media="(min-width: 640px)" srcSet={slide.image} />
                )}

                <img
                  className={styles.image}
                  src={slide.mobileImage || slide.image}
                  alt={slide.alt}
                />
              </picture>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="Next picture"
          onClick={() => goTo((index + 1) % SLIDES.length)}
        >
          <img src="img/icons/arrow-right.svg" alt="" width="16" height="16" />
        </button>
      </div>

      <div className={styles.dashes}>
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.to}
            type="button"
            className={styles.dash}
            aria-label={`Show picture ${slideIndex + 1}`}
            aria-current={slideIndex === index ? 'true' : undefined}
            onClick={() => goTo(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
};
