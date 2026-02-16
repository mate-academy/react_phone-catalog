import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './PicturesSlider.module.scss';
import bannerAccessories from '/img/banner-accessories.png';
import bannerPhones from '/img/banner-phones.png';
import bannerTablets from '/img/banner-tablets.png';

export const PicturesSlider = () => {
  const images = [bannerAccessories, bannerPhones, bannerTablets];

  return (
    <>
      <div className={styles.slider}>
        <button
          type="button"
          className={`${styles.slider_button} ${styles.prev} js-slider-prev`}
          aria-label="Previous slide"
        >
          ❮
        </button>

        <Swiper
          className={styles.slider_container}
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.my-pagination' }}
          navigation={{
            prevEl: '.js-slider-prev',
            nextEl: '.js-slider-next',
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className={styles.banner_image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={`${styles.slider_button} ${styles.next} js-slider-next`}
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>
      <div className="my-pagination" />
    </>
  );
};
