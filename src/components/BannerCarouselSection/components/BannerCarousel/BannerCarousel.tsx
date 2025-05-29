import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './BannerCarousel.module.scss';
import { NavLink } from 'react-router-dom';

export const BannerCarousel: React.FC = ({}) => {
  return (
    <>
      <div className={styles['banner-carousel-wrapper']}>
        <button
          className={`button-box button-box--size-auto button--arrow-left ${styles['banner-carousel__btn-prev']} hide-on-mobile`}
        ></button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: `.${styles['banner-carousel__btn-prev']}`,
            nextEl: `.${styles['banner-carousel__btn-next']}`,
          }}
          pagination={{
            el: `.${styles['banner-carousel__pagination']}`,
            clickable: true,
          }}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 5000 }}
          loop={true}
          className={styles['banner-carousel']}
        >
          <SwiperSlide>
            <NavLink to={'/product/apple-iphone-14-128gb-midnight'}>
              <img
                src={
                  window.innerWidth <= 640
                    ? '/img/banners/add-banner-mobile.jpg'
                    : '/img/banners/add-banner.jpg'
                }
                alt="Banner"
                className={styles['banner-image']}
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to={'/product/apple-iphone-14-128gb-midnight'}>
              <img
                src={
                  window.innerWidth <= 640
                    ? '/img/banners/add-banner-mobile.jpg'
                    : '/img/banners/add-banner.jpg'
                }
                alt="Banner"
                className={styles['banner-image']}
              />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to={'/product/apple-iphone-14-128gb-midnight'}>
              <img
                src={
                  window.innerWidth <= 640
                    ? '/img/banners/add-banner-mobile.jpg'
                    : '/img/banners/add-banner.jpg'
                }
                alt="Banner"
                className={styles['banner-image']}
              />
            </NavLink>
          </SwiperSlide>
        </Swiper>
        <button
          className={`button-box button-box--size-auto button--arrow-right ${styles['banner-carousel__btn-next']} hide-on-mobile`}
        ></button>
      </div>
      <div className="banner-carousel__pagination-wrapper">
        <div className={styles['banner-carousel__pagination']}></div>
      </div>
    </>
  );
};
