import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './WelcomeSlider.module.scss';
import './WelcomeSlider.module.scss';
import 'swiper/css';
import 'swiper/scss/free-mode';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { useAppSelector } from '../../../app/hooks';

export const WelcomeSlider = () => {
  const isDark = useAppSelector(state => state.boolean.isDark);

  return (
    <>
      <div className={styles.swiperWrapper}>
        <button
          id="welcome-slider-arrow-left"
          className={`${styles.moveSlide} ${isDark && styles.moveSlideDark}`}
        >
          <img
            className={styles.moveSlide__slideArrow}
            src="./icons/arrow-left-ico.svg"
            alt="arrowLeft"
          />
        </button>

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
              src="/img/banner-1.png"
              alt="slide1"
            />
          </SwiperSlide>

          <SwiperSlide className={styles.swiper__slide}>
            <img
              className={styles.swiper__img}
              src="/img/banner-2.jpg"
              alt="slide3"
            />
          </SwiperSlide>

          <SwiperSlide className={styles.swiper__slide}>
            <img
              className={styles.swiper__img}
              src="/img/banner-3.jpg"
              alt="slide3"
            />
          </SwiperSlide>

          <SwiperSlide className={styles.swiper__slide}>
            <img
              className={styles.swiper__img}
              src="/img/banner-4.png"
              alt="slide3"
            />
          </SwiperSlide>
        </Swiper>

        <button
          id="welcome-slider-arrow-right"
          className={`${styles.moveSlide} ${isDark && styles.moveSlideDark}`}
        >
          <img
            className={styles.moveSlide__slideArrow}
            src="./icons/aroow-right-ico.svg"
            alt="arrowLeft"
          />
        </button>
      </div>

      <div id="banner-container-of-bullets" className={styles.pagination}></div>
    </>
  );
};
