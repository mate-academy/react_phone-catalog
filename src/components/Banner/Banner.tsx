import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Banner.module.scss';

export const Banner = () => {
  const images = [
    '/img/banners/banner-1.jpg',
    '/img/banners/banner-2.avif',
    '/img/banners/banner-3.jpg',
  ];

  return (
    <section className={styles.banner}>
      <Swiper
        className={styles.swiper}
        modules={[Navigation, Pagination]}
        loop
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <img src={src} alt={`slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
