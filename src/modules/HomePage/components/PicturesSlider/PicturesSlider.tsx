import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { Link } from 'react-router-dom';

import bannerAccessories from 'assets/img/banner/banner-accessories.jpg';
import bannerPhones from 'assets/img/banner/banner-phones.jpg';
import bannerTablets from 'assets/img/banner/banner-tablets.jpg';
import arrowWhite from 'assets/img/icons/arrow-back-white.svg';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './PicturesSlider.module.scss';

export const PicturesSlider: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.swiperButtonPrev}>
        <img alt="arrow-back" src={arrowWhite} />
      </div>

      <Swiper
        autoplay={{ delay: 5000 }}
        className={styles.swiper}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
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
        slidesPerView={1}
        spaceBetween={0}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="/phones">
            <img alt="phone" src={bannerPhones} />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="/accessories">
            <img alt="accessories" src={bannerAccessories} />
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Link to="/tablets">
            <img alt="tablet" src={bannerTablets} />
          </Link>
        </SwiperSlide>
      </Swiper>

      <div className={styles.swiperPagination}></div>

      <div className={styles.swiperButtonNext}>
        <img alt="arrow-forward" src={arrowWhite} />
      </div>
    </div>
  );
};
