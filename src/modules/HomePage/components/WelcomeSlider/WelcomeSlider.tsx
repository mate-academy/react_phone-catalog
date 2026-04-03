import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './WelcomeSlider.module.scss';
import iconChevron from '@/assets/icons/icon-chevron.svg';

const SLIDES = [
  { src: '/img/banner-phones.png', alt: 'New models iPhone' },
  { src: '/img/banner-tablets.png', alt: 'New models iPad' },
  { src: '/img/banner-accessories.png', alt: 'New accessories' },
];

export const WelcomeSlider = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          pagination={{
            el: `.${styles.pagination}`,
            clickable: true,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className={styles.swiper}
        >
          {SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <img src={slide.src} alt={slide.alt} className={styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={styles.prev} aria-label="Previous slide">
          <img src={iconChevron} alt="" aria-hidden="true" />
        </button>

        <button className={styles.next} aria-label="Next slide">
          <img src={iconChevron} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className={styles.pagination} />
    </div>
  );
};
