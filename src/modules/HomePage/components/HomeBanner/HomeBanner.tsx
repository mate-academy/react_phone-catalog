import React from 'react';
import styles from './HomeBanner.module.scss';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Arrow from '../../../../components/Icons/Arrow/Arrow';
import { ArrowDirection } from '../../../../types/arrowDirection';

const bannerImg = [
  {
    id: 1,
    alt: 'accessories',
    src: 'img/banner/banner-iphone.png',
  },
  {
    id: 2,
    alt: 'accessories',
    src: 'img/banner/banner-iphone-bg.png',
  },
  {
    id: 3,
    alt: 'accessories',
    src: 'img/banner/banner-accessories.png',
  },
  {
    id: 4,
    alt: 'phones',
    src: 'img/banner/banner-phones.png',
  },
  {
    id: 5,
    alt: 'tablets',
    src: 'img/banner/banner-tablets.png',
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
        <Arrow
          className={classNames(styles.prev)}
          direction={ArrowDirection.left}
        />

        <Swiper
          className={classNames(styles.swiper)}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: `.${styles.next}`,
            prevEl: `.${styles.prev}`,
          }}
          pagination={{
            clickable: true,
            el: `.${styles['swiper-pagination']}`,
            bulletClass: styles['swiper-pagination-bullet'],
            bulletActiveClass: styles['swiper-pagination-bullet-active'],
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          key={preparedImgs.length}
        >
          {preparedImgs.map(banner => (
            <SwiperSlide key={banner.id}>
              <div className={styles.swiper__wrapper}>
                <img
                  className={styles.swiper__img}
                  src={banner.src}
                  alt={banner.alt}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Arrow
          className={classNames(styles.next)}
          direction={ArrowDirection.right}
        />
      </div>

      <div className={classNames(styles['swiper-pagination'])} />
    </section>
  );
};

export default HomeBanner;
