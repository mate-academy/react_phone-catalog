/* eslint-disable import/no-extraneous-dependencies */

import 'swiper/css';
import 'swiper/css/pagination';
import s from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import OkayIcon from '../../img/icons/icon-okay.svg?react';
import ArrowIcon from '../../img/icons/icon-arrow.svg?react';
import phoneImg from '../../img/slider/main-phone.png';
import phones from '../../img/slider/phones.png';
import tablets from '../../img/slider/tablets.png';

export const Slider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className={s.Slider}>
      <div className={`${s.Slider__content}`}>
        <button
          className={s.Slider__arrow}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowIcon className="icon--left" />
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
                  Now available
                  <br />
                  in our store!
                  <OkayIcon className={s.Slider__okay} />
                </p>
                <p className={s.Slider__beFirst}>Be the first</p>
              </div>

              <Link
                to={`/phones/apple-iphone-14-128gb-purple`}
                className={s.Slider__order}
              >
                Order now
              </Link>
            </div>

            <div className={s.Slider__slideBottom}>
              <div className={s.Slider__phoneName}>
                <p className={s.Slider__iphone}>iPhone 14 Pro</p>
                <p className={s.Slider__beyond}>Pro.Beyond.</p>
              </div>
              <img src={phoneImg} alt="001" className={s.Slider__phoneImg} />
            </div>
          </SwiperSlide>
          <SwiperSlide className={s.Slider__slide}>
            <img src={phones} className={s.Slider__images} alt="phones" />
          </SwiperSlide>
          <SwiperSlide className={s.Slider__slide}>
            <img src={tablets} className={s.Slider__images} alt="tablets" />
          </SwiperSlide>
        </Swiper>
        <div className={s.Slider__pagination}></div>

        <button
          className={s.Slider__arrow}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowIcon className="icon--right" />
        </button>
      </div>
    </div>
  );
};
