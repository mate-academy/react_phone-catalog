/* eslint-disable import/no-extraneous-dependencies */

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import s from './Slider.module.scss';

import { useEffect, useRef } from 'react';

export const Slider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.pagination.init();
        swiperRef.current.pagination.render();
        swiperRef.current.pagination.update();
      }
    }, 0);
  }, []);

  return (
    <div className={s.Slider}>
      <div className={`${s.Slider__content}`}>
        <button
          className={s.Slider__arrow}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868
              3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868
               8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715
               12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289
               8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715
               3.52861Z"
              fill="#000"
            />
          </svg>
        </button>

        <Swiper
          observer={false}
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{
            clickable: true,
            el: `.${s.Slider__pagination}`,
            bulletClass: `swiper-pagination-bullet ${s.Slider__bullet}`,
          }}
          className={s.Slider__slides}
          onSwiper={swiper => (swiperRef.current = swiper)}
        >
          <SwiperSlide className={s.Slider__slide}>
            <div className={s.Slider__slideTop}>
              <div className={s.Slider__textTop}>
                <p className={s.Slider__inStore}>
                  Now available <br />
                  in our store!{' '}
                  <span className={s.Slider__okay}>
                    <img src="img/icons/icon-okey.png" alt="okay" />
                  </span>
                </p>
                <p className={s.Slider__beFirst}>Be the first</p>
              </div>

              <a className={s.Slider__order}>Order now</a>
            </div>

            <div className={s.Slider__slideBottom}>
              <div className={s.Slider__phoneName}>
                <p className={s.Slider__iphone}>iPhone 14 Pro</p>
                <p className={s.Slider__beyond}>Pro.Beyond.</p>
              </div>
              <img
                src="img/slider/slider-top/001.png"
                alt="001"
                className={s.Slider__phoneImg}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={s.Slider__slide}>
            <img
              src="img/banner-phones.png"
              className={s.Slider__images}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide className={s.Slider__slide}>
            <img
              src="img/banner-tablets.png"
              className={s.Slider__images}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
        <div className={s.Slider__pagination}></div>

        <button
          className={s.Slider__arrow}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157
              3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716
              8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876
              12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735
              8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876
                3.52861Z"
              fill="#000"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
