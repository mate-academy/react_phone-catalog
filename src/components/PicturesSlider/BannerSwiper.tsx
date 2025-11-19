import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { MainSlider } from './MainSlider';

import bannerPhones from '../../../public/img/banner-phones.png';
import bannerStart from '../../../public/img/Banner.svg';
import bannerTablets from '../../../public/img/banner-tablets.png';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './BannerSwiper.module.scss';

const images = [bannerStart, bannerPhones, bannerTablets];

export default function BannerSwiper() {
  const { handlePrevSlide, handleNextSlide, onSwiperInit } = MainSlider();

  return (
    <>
      <div className={styles.swiperContainer}>
        <button className={styles.buttonPrev} onClick={handlePrevSlide}>
          {'<'}
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.buttonNext}`,
            prevEl: `.${styles.buttonPrev}`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: `.${styles.sliderPagination}`,
          }}
          onSwiper={onSwiperInit}
          effect="fade"
          loop={true}
          className={styles.swiperImages}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className={styles.banner}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={styles.buttonNext} onClick={handleNextSlide}>
          {'>'}
        </button>
      </div>

      <div className={styles.sliderPagination}></div>
    </>
  );
}
