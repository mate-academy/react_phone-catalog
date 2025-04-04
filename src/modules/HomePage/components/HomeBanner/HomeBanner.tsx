import React from 'react';
import styles from './HomeBanner.module.scss';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperStyles.scss';

const bannerImg = [
  {
    id: 1,
    alt: 'accessories',
    src: '/img/banner/banner-iphone.png',
  },
  {
    id: 2,
    alt: 'accessories',
    src: '/img/banner/banner-iphone-bg.png',
  },
  {
    id: 3,
    alt: 'accessories',
    src: '/img/banner/banner-accessories.png',
  },
  {
    id: 4,
    alt: 'phones',
    src: '/img/banner/banner-phones.png',
  },
  {
    id: 5,
    alt: 'tablets',
    src: '/img/banner/banner-tablets.png',
  },
];

const HomeBanner = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const preparedImgs = isMobile
    ? bannerImg.filter(banner => banner.id !== 2)
    : bannerImg.filter(banner => banner.id !== 1);

  return (
    <section className={classNames(styles.banner)}>
      <div className={styles.banner__wrapper}>
        <div className={classNames('swiper-button-prev', 'nav-button')} />
        <Swiper
          className="swiper"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          key={preparedImgs.length}
        >
          {preparedImgs.map(banner => (
            <SwiperSlide key={banner.id}>
              <div className="swiper__wrapper">
                <img
                  className="swiper__img"
                  src={banner.src}
                  alt={banner.alt}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={classNames('swiper-button-next', 'nav-button')} />
      </div>
      <div className={classNames('swiper-pagination')} />
    </section>
  );
};

export default HomeBanner;
