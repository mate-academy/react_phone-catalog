// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Swiper.scss';

import styles from './Banner.module.scss';
import bannerMain from './../../images/img/banner.jpg';
import bannerAccess from './../../images/img/banner-accessories.png';
import bannerPhones from './../../images/img/banner-phones.png';
import bannerTablets from './../../images/img/banner-tablets.png';
import arrowIcon from './../../images/icons/arrow-up.svg';
import { useMemo } from 'react';

const images = [bannerMain, bannerAccess, bannerPhones, bannerTablets];

const {
  banner,
  banner__slider,
  banner__body,
  banner__pagination,
  banner__pagination_item,
  banner__pagination_active,
  banner__icon,
  banner__icon_left,
  banner__icon_right,
  banner__image,
  banner__button,
} = styles;

export const Banner = () => {
  return (
    <section className={banner}>
      <div className="container">
        {/* <div className={banner__slider}>
          <div className={banner__body}>
            <button className={banner__button}>
              <img
                src={arrowIcon}
                alt=""
                className={`${banner__icon} ${banner__icon_left} `}
              />
            </button>
            <img src={bannerMain} alt="" className={banner__image} />
            <button className={banner__button}>
              <img
                src={arrowIcon}
                alt=""
                className={`${banner__icon} ${banner__icon_right} `}
              />
            </button>
          </div>
          <div className={banner__pagination}>
            <div
              className={`${banner__pagination_item} ${banner__pagination_active} `}
            >
              <span></span>
            </div>
            <div className={banner__pagination_item}>
              <span></span>
            </div>
            <div className={banner__pagination_item}>
              <span></span>
            </div>
          </div>
        </div> */}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className=""
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt="slider" />
            </SwiperSlide>
          ))}
          {/*
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide> */}
        </Swiper>
      </div>
    </section>
  );
};
