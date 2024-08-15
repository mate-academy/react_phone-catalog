import { useRef } from 'react';
import { slideImages } from '../../constants/constants';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Button } from '../../ui/Button/Button';
import styles from './ProductBanners.module.scss';

export const ProductBanners = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const TIME_SLIDER = 5000;

  const handlePrevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <>
      <div className={styles.productBanners}>
        <Button
          onClick={handlePrevSlide}
          arrow={{ type: 'left', fill: '#F1F2F9' }}
          size="stretch"
          appearance="dark"
        >
          {''}
        </Button>

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
                className={styles.picture}
                src={image}
                alt="product-banner"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          onClick={handleNextSlide}
          arrow={{ type: 'right', fill: '#F1F2F9' }}
          appearance="dark"
          size="stretch"
        >
          {''}
        </Button>
      </div>
      <div className="button-swiper">
        <div className="swiper-pagination"></div>
      </div>
    </>
  );
};
