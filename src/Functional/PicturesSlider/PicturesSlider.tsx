import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { MainSlider } from './MainSlider';

import bannerPhones from '../../../public/img/banner-phones.png';
import bannerAccessories from '../../../public/img/banner-accessories.png';
import bannerTablets from '../../../public/img/banner-tablets.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './PicturesSlider.module.scss';

const images = [bannerPhones, bannerAccessories, bannerTablets];

export default function SliderSwiper() {
  const { handlePrevSlide, handleNextSlide, onSwiperInit } = MainSlider();

  return (
    <div className={styles.swiper}>
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
          pagination={{ clickable: true }}
          effect="fade"
          className={styles.swiperImages}
          onSwiper={onSwiperInit}
          loop={true}
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
    </div>
  );
}
