import { useEffect, useRef, useState } from 'react';
import styles from './BannerSlider.module.scss';
import { Chevron } from '../icons/Chevron';

const banners = [
  {
    id: 0,
    img: '/img/banner-accessories.png',
    title: 'Top accessories',
  },
  {
    id: 1,
    img: '/img/banner-phones.png',
    title: 'Latest smartphones',
  },
  {
    id: 2,
    img: '/img/banner-tablets.png',
    title: 'Tablets for work and play',
  },
];

export const BannerSlider = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex(current => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    if (isMobile) {
      viewport.scrollTo({
        left: viewport.clientWidth * index,
        behavior: 'smooth',
      });
    }
  }, [index, isMobile]);

  const prev = () =>
    setIndex(current => (current - 1 + banners.length) % banners.length);

  const next = () => setIndex(current => (current + 1) % banners.length);

  const handleDotClick = (nextIndex: number) => {
    setIndex(nextIndex);
  };

  const handleMobileScroll = () => {
    const viewport = viewportRef.current;

    if (!viewport || window.innerWidth >= 640) {
      return;
    }

    const nextIndex = Math.round(viewport.scrollLeft / viewport.clientWidth);

    if (nextIndex !== index) {
      setIndex(nextIndex);
    }
  };

  return (
    <section className={styles.slider} aria-label="Promotional banners">
      <div className={styles.slider__frame}>
        <button
          type="button"
          onClick={prev}
          className={styles.slider__arrow}
          aria-label="Previous slide"
        >
          <Chevron direction="left" />
        </button>

        <div
          ref={viewportRef}
          className={styles.slider__viewport}
          onScroll={handleMobileScroll}
        >
          <div
            className={styles.slider__track}
            style={
              !isMobile
                ? { transform: `translateX(-${index * 100}%)` }
                : undefined
            }
          >
            {banners.map(banner => (
              <article key={banner.id} className={styles.slider__slide}>
                <img
                  src={banner.img}
                  alt={banner.title}
                  className={styles.slider__image}
                />
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          className={styles.slider__arrow}
          aria-label="Next slide"
        >
          <Chevron direction="right" />
        </button>
      </div>

      <div className={styles.slider__dots}>
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => handleDotClick(i)}
            className={`${styles.slider__dot} ${
              i === index ? styles.slider__dotActive : ''
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
