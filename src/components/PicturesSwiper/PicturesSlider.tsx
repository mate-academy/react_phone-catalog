import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './PicturesSlider.module.scss';
import { NavLink } from 'react-router-dom';

const mobileSlides = [
  {
    id: 1,
    image: 'img/banner-mobile-1.png',
    alt: 'banner-mobile-1',
    to: '/phones/apple-iphone-14-pro-128gb-spaceblack',
  },
  {
    id: 2,
    image: 'img/banner-mobile-2.png',
    alt: 'banner-mobile-2',
    to: '/tablets',
  },
  {
    id: 3,
    image: 'img/banner-mobile-3.png',
    alt: 'banner-mobile-3',
    to: '/accessories',
  },
];

const tabletSlides = [
  {
    id: 1,
    image: 'img/banner-tablet-1.png',
    alt: 'banner-tablet-1',
    to: '/phones/apple-iphone-14-pro-128gb-spaceblack',
  },
  {
    id: 2,
    image: 'img/banner-tablet-2.png',
    alt: 'banner-tablet-2',
    to: '/tablets',
  },
  {
    id: 3,
    image: 'img/banner-tablet-3.png',
    alt: 'banner-tablet-3',
    to: '/accessories',
  },
];

export const PicturesSlider = () => {
  const isTabletOrDesktop = useMediaQuery({ minWidth: '640px' });

  const slides = isTabletOrDesktop ? tabletSlides : mobileSlides;
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={styles.slider}>
      <button ref={prevRef} className={styles.prevEl}>
        &lt;
      </button>
      <button ref={nextRef} className={styles.nextEl}>
        &gt;
      </button>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={
          isTabletOrDesktop
            ? { prevEl: prevRef.current, nextEl: nextRef.current }
            : false
        }
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
              <NavLink className={styles.slide_link} to={slide.to}>
                <img
                  src={`${import.meta.env.BASE_URL}${slide.image}`}
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
