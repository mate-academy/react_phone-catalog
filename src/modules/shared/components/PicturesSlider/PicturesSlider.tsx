import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Icon } from '../Icon';
import styles from './PicturesSlider.module.scss';

interface Slide {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
}

interface Props {
  slides: Slide[];
  intervalMs?: number;
}

export const PicturesSlider: React.FC<Props> = ({
  slides,
  intervalMs = 5000,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <button
          type="button"
          ref={setPrevEl}
          className={styles.navButton}
          aria-label="Previous slide"
        >
          <Icon name="chevron-left" />
        </button>

        <div className={styles.wrapper}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop
            autoplay={{ delay: intervalMs, disableOnInteraction: false }}
            navigation={{ prevEl, nextEl }}
            pagination={{
              el: paginationEl,
              clickable: true,
              bulletClass: styles.dash,
              bulletActiveClass: styles.active,
              renderBullet: (index, className) =>
                `<span class="${className}" aria-label="Go to slide ${index + 1}"></span>`,
            }}
            className={styles.swiper}
          >
            {slides.map(slide => (
              <SwiperSlide key={slide.image} className={styles.slide}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={styles.image}
                />

                <div className={styles.overlay}>
                  <p className={styles.title}>{slide.title}</p>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                  <Link to={slide.ctaTo} className={styles.cta}>
                    {slide.ctaLabel}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          ref={setNextEl}
          className={styles.navButton}
          aria-label="Next slide"
        >
          <Icon name="chevron-right" />
        </button>
      </div>

      <div className={styles.dashes} ref={setPaginationEl} />
    </div>
  );
};
