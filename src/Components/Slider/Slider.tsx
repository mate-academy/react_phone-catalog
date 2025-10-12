import React, { useRef } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Slider.module.scss';

const slidesData = [
  {
    id: 1,
    img: './img/Banner.png',
  },
  {
    id: 2,
    img: './img/banner-accessories.png',
  },
  {
    id: 3,
    img: './img/banner-phones.png',
  },
];

export const Slider: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        className={styles.swiper}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
      >
        {slidesData.map(slide => (
          <SwiperSlide key={slide.id} className={styles['swiper-slide']}>
            <div className={styles.slide}>
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet={`./img/mobile-${slide.id}.png`}
                />
                <img src={slide.img} alt={`Slide ${slide.id}`} />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <>
        <button
          className={`${styles.button} ${styles.prev}`}
          onClick={handlePrevSlide}
        />
        <button
          className={`${styles.button} ${styles.next}`}
          onClick={handleNextSlide}
        />
      </>
      <div className="pagination-container">
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};
