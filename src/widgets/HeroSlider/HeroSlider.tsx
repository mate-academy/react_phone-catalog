import { useRef } from 'react';
import {
  Swiper as SwiperType,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';

import { Icon } from '../../shared/Icon';
import styles from './HeroSlider.module.scss';
import { slides } from './slides.data';

export const HeroSlider = () => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Icon className={styles.navIcon} id="arrow-left" />
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            el: `.${styles.pagination}`,
            clickable: true,
            renderBullet: (_, className) => {
              return `<span class="${className}"></span>`;
            },
            bulletClass: `${styles.paginationBullet} swiper-pagination-bullet`,
          }}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className={styles.slider}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.path}
                className={styles.image}
                alt={slide.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Icon className={styles.navIcon} id="arrow-right" />
        </button>
      </div>
      <div className={styles.pagination} />
    </div>
  );
};
