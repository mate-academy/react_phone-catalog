import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import styles from './swiper.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export const MySwiper = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      pagination={{ clickable: true, type: 'bullets', dynamicBullets: true }}
      navigation={{
        nextEl: `.${styles.swiper__next}`,
        prevEl: `.${styles.swiper__prev}`,
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className={`${styles.mySwiper} ${styles.swiper}`}
    >
      <SwiperSlide className={`${styles.swiper__slide}`}>
        <img
          src="public/img/slider/slider-1.png"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--mobile']}`}
        />

        <div className={`${styles.swiper__slideContentTablet}`}>
          <div className={styles.swiper__order}>
            <h2 className={styles.swiper__orderTitle}>Now available in our store!</h2>
            <p className={styles.swiper__orderText}>Be the first!</p>
            <Link to="/phones" className={styles.swiper__orderButton}>
              Order now
            </Link>
          </div>

          <img
            src="public/img/slider/slider-1.png"
            alt="iPhone 14"
            className={`${styles.swiper__image} ${styles['swiper__image--tabletOrder']}`}
          />
        </div>
      </SwiperSlide>

      <SwiperSlide className={styles.swiper__slide}>
        <img
          src="public/img/slider/slider-2.jpg"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--mobile']}`}
        />

        <img
          src="public/img/slider/swiper-tablet-2.webp"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--tablet']}`}
        />
      </SwiperSlide>

      <SwiperSlide className={styles.swiper__slide}>
        <img
          src="public/img/slider/slider-3.webp"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--mobile']}`}
        />

        <img
          src="public/img/slider/slider-tablet-3.jpeg"
          alt="iPhone 14"
          className={`${styles.swiper__image} ${styles['swiper__image--tablet']}`}
        />
      </SwiperSlide>

      <div className={styles.swiper__prev}></div>
      <div className={styles.swiper__next}></div>
    </Swiper>
  );
};
