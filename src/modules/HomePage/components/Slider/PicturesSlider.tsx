import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from './PicturesSlider.module.scss';

export const PicturesSlider = () => {
  return (
    <div className={styles['swiper-container']}>
      <div className={styles['swiper-button-prev']}>
        <img src="/img/icons/arrow-back.svg" alt="arrow-back" />
      </div>

      <Swiper
        className={styles.swiper}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 5000 }}
        navigation={{
          prevEl: `.${styles['swiper-button-prev']}`,
          nextEl: `.${styles['swiper-button-prev']}`,
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: styles['swiper-pagination-bullet'],
          bulletActiveClass: styles['swiper-pagination-bullet-active'],
          bulletElement: 'div',
        }}
      >
        <SwiperSlide>
          <img src="img/banner/banner-phones.jpg" alt="phone" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="img/banner/banner-accessories.jpg" alt="accessories" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="img/banner/banner-tablets.jpg" alt="tablet" />
        </SwiperSlide>
      </Swiper>

      <div className={styles['swiper-button-next']}>
        <img src="/img/icons/arrow-forward.svg" alt="arrow-forward" />
      </div>
    </div>
  );
};
