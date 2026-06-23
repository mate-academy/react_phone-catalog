import React, { useRef, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export const Slider: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.slider}>
        {swiperReady && (
          <Swiper
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
            <SwiperSlide>
              <div className={styles.slider_image}>
                <img src="img/slider/first.jpg" alt="Slide 1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slider_image}>
                <img src="img/slider/second.jpg" alt="Slide 2" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slider_image}>
                <img src="img/slider/third.jpg" alt="Slide 3" />
              </div>
            </SwiperSlide>
          </Swiper>
        )}
        <button
          ref={prevRef}
          className={`${styles.slider_button} ${styles.slider_button_prev}`}
          aria-label="Previous slide"
          type="button"
        >
          <img src="img/slider/arrow_left.svg" alt="Prev" />
        </button>

        <button
          ref={nextRef}
          className={`${styles.slider_button} ${styles.slider_button_next}`}
          aria-label="Next slide"
          type="button"
        >
          <img src="img/slider/arrow_right.svg" alt="Next" />
        </button>
      </div>

      <div ref={paginationRef} className={styles.customPagination}></div>
    </div>
  );
};
