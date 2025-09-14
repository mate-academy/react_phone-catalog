import React from 'react';
import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Slider: React.FC = () => {
  return (
    <div className={styles.slider}>
      <h1 className={styles.sliderTitle}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.swiper}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide>
            <img
              src="/public/img/slider/first.jpg"
              alt="Slide 1"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/public/img/slider/second.jpg"
              alt="Slide 2"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/public/img/slider/third.jpg"
              alt="Slide 3"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
