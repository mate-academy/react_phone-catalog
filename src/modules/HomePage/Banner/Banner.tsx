/* eslint max-len: "off" */
import React, { useRef } from 'react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Banner.module.scss';

export const Banner = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div>
      <div className={styles.banner}>
        <button
          className={styles.navButton}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <img
            className={styles.icon}
            src="/img/icons/arrow-left.png"
            alt="Arrow Left"
          />
        </button>

        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
            bulletClass: `${styles.bullet}`,
            bulletActiveClass: `${styles.bulletActive}`,
          }}
          className={styles.swiper}
        >
          <SwiperSlide key={1}>
            <div className={`${styles.swiperCard} ${styles.swiperCard1}`} />
          </SwiperSlide>
          <SwiperSlide key={2}>
            <div className={`${styles.swiperCard} ${styles.swiperCard2}`} />
          </SwiperSlide>
          <SwiperSlide key={3}>
            <div className={`${styles.swiperCard} ${styles.swiperCard3}`} />
          </SwiperSlide>
        </Swiper>

        <button
          className={styles.navButton}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <img
            className={styles.icon}
            src="/img/icons/arrow-right.png"
            alt="Arrow Right"
          />
        </button>
      </div>

      <div className={styles.pagination}></div>
    </div>
  );
};
