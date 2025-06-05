import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import bannerAccessories from '../../../../assets/img/banner/banner-accessories.jpg';
import bannerPhones from '../../../../assets/img/banner/banner-phones.jpg';
import bannerTablets from '../../../../assets/img/banner/banner-tablets.jpg';
import { Icon } from '../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../shared/components/ui/Icon/IconNames';

import styles from './PicturesSlider.module.scss';

export const PicturesSlider: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.swiperButtonPrev}>
        <Icon
          className={classNames(styles.arrowIcon, styles.arrowPrev)}
          name={IconNames.Arrow}
        />
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
        <Icon className={styles.arrowIcon} name={IconNames.Arrow} />
      </div>
    </div>
  );
};
