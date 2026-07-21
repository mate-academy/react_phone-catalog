import { useEffect, useState } from 'react';
import styles from './HeroSlider.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { buildUrl } from '../../modules/shared/utils/buildUrl';

const MOBILE_BREAKPOINT = 639;

const desktopImages = [
  'img/banner.png',
  'img/banner-phones.png',
  'img/banner-accessories.png',
];

const mobileImages = [
  'img/banner-mobile.png',
  'img/banner-phones.png',
  'img/banner-accessories.png',
];

export const HeroSlider = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.prevBtn} ${styles.navButton}`}
        aria-label="Prev Slide"
      >
        <img src={buildUrl('img/icons/arrow-left.png')} alt="Arrow Left" />
      </button>

      <Swiper
        className={styles.swiper}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: `.${styles.prevBtn}`,
          nextEl: `.${styles.nextBtn}`,
        }}
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img}>
            <img
              src={buildUrl(img)}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`${styles.nextBtn} ${styles.navButton}`}
        aria-label="Next slide"
      >
        <img src={buildUrl('img/icons/arrow-right.png')} alt="Arrow Right" />
      </button>
    </div>
  );
};
