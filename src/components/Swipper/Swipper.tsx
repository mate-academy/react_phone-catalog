import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Swipper.module.scss';
import { useEffect, useRef, useState } from 'react';

import img1 from '../../../public/img/banner-accessories.png';
import img2 from '../../../public/img/banner-phones.png';
import img3 from '../../../public/img/banner-tablets.png';

export const Swipper = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <button
        ref={prevRef}
        className={`${styles.wrapper__button} ${styles['wrapper__button--left']}`}
        type="button"
      >
        <img src="./img/icons/arrowLeftBtn.svg" alt="Prev" />
      </button>
      {swiperReady && (
        <Swiper
          className={styles.wrapper__swiper}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: '#swiper-pagination',
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} alt="" />
          </SwiperSlide>
        </Swiper>
      )}

      <button
        ref={nextRef}
        className={`${styles.wrapper__button} ${styles['wrapper__button--right']}`}
        type="button"
      >
        <img src="./img/icons/arrowRightBtn.svg" alt="Next" />
      </button>

      <div
        id="swiper-pagination"
        ref={paginationRef}
        className={styles.pagination}
      ></div>
    </div>
  );
};
