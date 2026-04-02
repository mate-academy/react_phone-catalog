import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './WelcomeSlider.module.scss';

const SLIDES = [
  { src: '/img/banner-phones.png', alt: 'New models iPhone' },
  { src: '/img/banner-tablets.png', alt: 'New models iPad' },
  { src: '/img/banner-accessories.png', alt: 'New accessories' },
];

export const WelcomeSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{
        prevEl: `.${styles.prev}`,
        nextEl: `.${styles.next}`,
      }}
      pagination={{
        el: `.${styles.dots}`,
        clickable: true,
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className={styles.slider}
    >
      {SLIDES.map((slide, i) => (
        <SwiperSlide key={i}>
          <img src={slide.src} alt={slide.alt} className={styles.slide} />
        </SwiperSlide>
      ))}

      <button className={styles.prev} aria-label="Previous slide">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="#313237"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button className={styles.next} aria-label="Next slide">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4L10 8L6 12"
            stroke="#313237"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.dots} />
    </Swiper>
  );
};
