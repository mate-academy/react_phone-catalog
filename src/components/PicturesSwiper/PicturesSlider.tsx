import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './PicturesSlider.module.scss';
import { NavLink } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: '/img/banner-mobile-1.png',
    alt: 'banner-mobile-1',
    to: '/phones',
  },
  {
    id: 2,
    image: '/img/banner-mobile-2.png',
    alt: 'banner-mobile-2',
    to: '/tablets',
  },
  {
    id: 3,
    image: '/img/banner-mobile-3.png',
    alt: 'banner-mobile-3',
    to: '/accessories',
  },
];

export const PicturesSlider = () => {
  const isDesktop = useMediaQuery({ minWidth: 640 });

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={isDesktop}
        pagination={{
          clickable: true,
          el: `.${styles.pagination}`,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.activeBullet,
        }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <NavLink to={slide.to}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={styles.image}
                />
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.pagination}></div>
    </div>
  );
};
