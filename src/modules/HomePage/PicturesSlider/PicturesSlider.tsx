/* eslint-disable import/no-extraneous-dependencies */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

// My styles & icons
import styles from './PicturesSlider.module.scss';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// React imports
import { useRef } from 'react';

export const PicturesSlider = () => {
  const swiperRef = useRef<Swiper | null>(null);

  return (
    <div className={styles.productSlider__Container}>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={styles.productSlider__Button}
      >
        <ChevronLeft className={styles.productSlider__ButtonIcon} />
      </button>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={swiper => {
          swiperRef.current = swiper;

          setTimeout(() => {
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          });
        }}
        className={styles.sliderRoot}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <img
            src={`img/banner-phones.png`}
            className={styles.swiperSlide__Image}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img
            src={`img/banner-tablets.png`}
            className={styles.swiperSlide__Image}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img
            src={`img/banner-accessories.png`}
            className={styles.swiperSlide__Image}
          />
        </SwiperSlide>
      </Swiper>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={styles.productSlider__Button}
      >
        <ChevronRight className={styles.productSlider__ButtonIcon} />
      </button>
    </div>
  );
};
