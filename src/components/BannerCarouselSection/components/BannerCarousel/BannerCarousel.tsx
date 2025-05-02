import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './BannerCarousel.module.scss';

export const BannerCarousel: React.FC = ({}) => {
  return (
    <>
      <div className={styles['banner-carousel-wrapper']}>
        <button
          className={`button-box button-box--size-auto button--arrow-left ${styles['banner-carousel__btn-prev']}`}
        ></button>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: `.${styles['banner-carousel__btn-prev']}`,
            nextEl: `.${styles['banner-carousel__btn-next']}`,
          }}
          pagination={{
            el: `.${styles['banner-carousel__pagination']}`,
            clickable: true,
          }}
          slidesPerView={1}
          loop={true}
          className={styles['banner-carousel']}
        >
          <SwiperSlide>
            <div>
              <div>
                <h2>
                  Now available
                  <br /> in our store! 👌
                </h2>
                <p>Be the first!</p>
                <button className={styles.orderBtn}>ORDER NOW</button>
              </div>
              <img
                src="/images/iphone-14.png"
                alt="iPhone 14 Pro"
                className={styles.productImage}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>Another Slide Here</div>
          </SwiperSlide>
          <SwiperSlide>
            <div>Another Slide Here</div>
          </SwiperSlide>
        </Swiper>
        <button
          className={`button-box button-box--size-auto button--arrow-right ${styles['banner-carousel__btn-next']}`}
        ></button>
      </div>
      <div className="banner-carousel__pagination-wrapper">
        <div className={styles['banner-carousel__pagination']}></div>
      </div>
    </>
  );
};
