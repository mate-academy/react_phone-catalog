import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import styles from './PicturesSlider.module.scss';
import { ArrowIcon } from '../../../../components/Icons/ArrowIcon';
import { Link } from 'react-router-dom';

export const PicturesSlider = () => {
  return (
    <section className={styles.swiper__wrapper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          type: 'bullets',
          el: '.swiper-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className={styles.swiper__banner}>
            <div className={styles.swiper__orderBlock}>
              <div>
                <h2 className={styles.swiper__orderTitle}>
                  Now available in our store!
                </h2>
                <p>Be the first!</p>
              </div>
              <Link
                to="/phones/apple-iphone-14-pro-256gb-spaceblack"
                className={styles.swiper__orderBtn}
              >
                Order now
              </Link>
            </div>
            <div
              className={`${styles.swiper__image} ${styles[`swiper__image--1`]}`}
            ></div>
          </div>

          <Link
            to="/phones/apple-iphone-14-pro-256gb-spaceblack"
            className={styles.swiper__banner__mobile}
          >
            <div
              className={`${styles.swiper__image} ${styles[`swiper__image--1--mob`]}`}
            ></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`${styles.swiper__image} ${styles[`swiper__image--2`]}`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`${styles.swiper__image} ${styles[`swiper__image--3`]}`}
          ></div>
        </SwiperSlide>
      </Swiper>

      <div className="buttons-wrapper">
        <button className="swiper-button-prev">
          <ArrowIcon />
        </button>
        <button className="swiper-button-next">
          <ArrowIcon />
        </button>
        <button className="swiper-pagination"></button>
      </div>
    </section>
  );
};
