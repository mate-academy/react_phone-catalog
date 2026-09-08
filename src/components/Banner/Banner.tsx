import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Banner.module.scss';
import { useEffect, useRef, useState } from 'react';

export const Banner = () => {
  const images = [
    `./img/banners/banner-phones.png`,
    `./img/banners/banner-accessories.png`,
    `./img/banners/banner-tablets.png`,
  ];

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <>
      <div className={styles.banner}>
        {swiperReady && (
          <Swiper
            className={styles.banner__swiper}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className={styles.banner__slide}>
                <img src={src} alt={`slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <button
          ref={prevRef}
          className={`${styles.banner__button} ${styles['banner__button--prev']}`}
          aria-label="Previous slide"
          type="button"
        >
          <img src="./img/icons/icon-arrow-left.svg" alt="Prev" />
        </button>

        <button
          ref={nextRef}
          className={`${styles.banner__button} ${styles['banner__button--next']}`}
          aria-label="Next slide"
          type="button"
        >
          <img src={`./img/icons/icon-arrow-right.svg`} alt="Next" />
        </button>
      </div>

      <div ref={paginationRef} className={styles.pagination} />
    </>
  );
};
