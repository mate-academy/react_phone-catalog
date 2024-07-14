import { BannerButton } from '../../ui/BannerButton/BannerButton';

import { useRef } from 'react';
import { arrowRightIcon, arrowleftIcon } from '../../assets';
import { TIME_SLIDER, slideImages } from '../../constants/constants';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './ProductBanners.module.scss';

export const ProductBanners = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <>
      <div className={styles.ProductBanners}>
        <BannerButton
          isDisabled={false}
          onClick={handlePrevSlide}
          type="Prev"
          icon={arrowleftIcon}
        />
        <Swiper
          autoplay={{
            delay: TIME_SLIDER,
            disableOnInteraction: false,
          }}
          className="clientSwiper"
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          ref={swiperRef}
          slidesPerView={1}
          loop={true}
        >
          {slideImages.map(image => (
            <SwiperSlide key={image}>
              <img
                key={image}
                className={styles.Picture}
                src={image}
                alt="product-banner"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <BannerButton
          isDisabled={false}
          onClick={handleNextSlide}
          type="Next"
          icon={arrowRightIcon}
        />
      </div>
      <div className="button-swiper">
        <div className="swiper-pagination"></div>
      </div>
    </>
  );
};
