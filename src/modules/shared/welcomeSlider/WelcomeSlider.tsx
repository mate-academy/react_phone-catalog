import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './WelcomeSlider.module.scss';
import './WelcomeSlider.module.scss';
import 'swiper/css';
import 'swiper/scss/free-mode';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

export const WelcomeSlider = () => {
  return (
    <>
      <div className={styles.swiperWrapper}>
        <div id="welcome-slider-arrow-left" className={styles.moveSlide}>
          <img
            className={styles.moveSlide__slideArrow}
            src="./icons/arrow-left-ico.svg"
            alt="arrowLeft"
          />
        </div>
        <Swiper
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 5000 }}
          pagination={{
            el: '#banner-container-of-bullets',
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            clickable: true,
          }}
          navigation={{
            prevEl: '#welcome-slider-arrow-left',
            nextEl: '#welcome-slider-arrow-right',
          }}
          freeMode={true}
          slidesPerView={1}
          className={styles.swiper}
          loop
        >
          <SwiperSlide className={styles.swiper__slide}>
            <img
              className={styles.swiper__img}
              src="./img/banner-accessories.png"
              alt="slide1"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper__slide}>
            <img
              className={styles.swiper__img}
              src="./img/banner-phones.png"
              alt="slide2"
            />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper__slide}>
            <img
              className={styles.swiper__img}
              src="./img/banner-tablets.png"
              alt="slide3"
            />
          </SwiperSlide>
        </Swiper>
        <div id="welcome-slider-arrow-right" className={styles.moveSlide}>
          <img
            className={styles.moveSlide__slideArrow}
            src="./icons/aroow-right-ico.svg"
            alt="arrowLeft"
          />
        </div>
      </div>

      <div id="banner-container-of-bullets" className={styles.pagination}></div>
    </>
  );
};
