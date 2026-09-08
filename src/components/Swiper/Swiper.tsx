import { useContext, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper';
import { Swiper as SwiperClass } from 'swiper/types';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ThemeContext } from '../../context/ThemeContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Swiper.module.scss';

export const HomeSwiper = () => {
  const homeSwiperRef = useRef<SwiperCore | null>(null);

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;

  return (
    <div className={styles.swiperContainer}>
      <div className={styles.swiperWrapper}>
        <button
          className={styles.navigationButton}
          onClick={() => homeSwiperRef.current?.slidePrev()}
        >
          {theme === 'light' ? (
            <img src="icons\arrow-prev.svg" alt="slide prev" />
          ) : (
            <img src="icons\arrow-prev-dark.svg" alt="slide prev" />
          )}
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop
          pagination={{
            clickable: true,
            el: `.${styles.swiperPagination}`,
            bulletClass: styles.swiperPaginationBullet,
            bulletActiveClass: styles.swiperPaginationBulletActive,
          }}
          className={styles.swiper}
          autoplay={{ delay: 5000 }}
          onSwiper={(swiper: SwiperClass) => {
            homeSwiperRef.current = swiper;
          }}
        >
          <SwiperSlide>
            <div className={`${styles.swiperItem} ${styles.swiperItem3}`}>
              <h2>
                Lorem ipsum dolor, sit amet consectetur adipisicing
                <span> ipsum dipisicing elit.</span>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.swiperItem} ${styles.swiperItem2}`}>
              <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={`${styles.swiperItem} ${styles.swiperItem3}`}>
              <h2>
                Lorem ipsum dolor, sit amet consectetur adipisicing
                <span> ipsum dipisicing elit.</span>
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
        <button
          className={styles.navigationButton}
          onClick={() => homeSwiperRef.current?.slideNext()}
        >
          {theme === 'light' ? (
            <img src="icons\arrow-next.svg" alt="slide next" />
          ) : (
            <img src="icons\arrow-next-dark.svg" alt="slide next" />
          )}
        </button>
      </div>
      <div
        className={`${styles.customPagination} ${styles.swiperPagination}`}
      ></div>
    </div>
  );
};
