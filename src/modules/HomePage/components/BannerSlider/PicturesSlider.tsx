import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from './PicturesSlider.module.scss';

export const PicturesSlider: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.swiperButtonPrev}>
        <img src="img/icons/arrow-back-white.svg" alt="arrow-back" />
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        className={styles.swiper}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop={true}
        navigation={{
          prevEl: `.${styles.swiperButtonPrev}`,
          nextEl: `.${styles.swiperButtonNext}`,
        }}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: `.${styles.swiperPagination}`,
          bulletElement: 'div',
          bulletClass: styles.swiperPaginationBullet,
          bulletActiveClass: styles.swiperPaginationBulletActive,
        }}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <a href="/phones">
            <img src="img/banner/banner-phones.jpg" alt="phone" />
          </a>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <a href="/accessories">
            <img src="img/banner/banner-accessories.jpg" alt="accessories" />
          </a>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <a href="/tablets">
            <img src="img/banner/banner-tablets.jpg" alt="tablet" />
          </a>
        </SwiperSlide>
      </Swiper>

      <div className={styles.swiperPagination}></div>

      <div className={styles.swiperButtonNext}>
        <img src="img/icons/arrow-back-white.svg" alt="arrow-forward" />
      </div>
    </div>
  );
};
