import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Slider.module.scss';

const slidesData = [
  {
    id: 1,
    img: '/img/Banner.png',
  },
  {
    id: 2,
    img: '/img/banner-accessories.png',
  },
  {
    id: 3,
    img: '/img/banner-phones.png',
  },
];

export const Slider: React.FC = () => {
  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        className={styles.swiper}
      >
        {slidesData.map(slide => (
          <SwiperSlide key={slide.id} className={styles['swiper-slide']}>
            <div className={styles.slide}>
              <img src={slide.img} alt={`Slide ${slide.id}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pagination-container">
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};
