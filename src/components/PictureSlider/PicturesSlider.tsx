import React, { useCallback, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { banners } from '../../helpers/utils/constants';
import './PicturesSlider.scss';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import 'swiper/css';
import 'swiper/css/pagination';

export const PicturesSlider: React.FC = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    const currentIndex = swiperRef?.activeIndex || 0;
    const totalSlides = swiperRef?.slides?.length || 0;

    if (currentIndex > 0) {
      swiperRef?.slidePrev();
    } else {
      swiperRef?.slideTo(totalSlides - 1);
    }
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    const currentIndex = swiperRef?.activeIndex || 0;
    const totalSlides = swiperRef?.slides?.length || 0;

    if (currentIndex < totalSlides - 1) {
      swiperRef?.slideNext();
    } else {
      swiperRef?.slideTo(0);
    }
  }, [swiperRef]);

  return (
    <div className="picture-slider">
      <div className="picture-slider__content">
        <ButtonIcon
          type="event"
          shape="left"
          dynamicClasses={['large']}
          onClick={handlePrevious}
        />

        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={30}
          centeredSlides
          scrollbar={{ draggable: true }}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper picture-slider"
        >
          {banners.map(banner => (
            <SwiperSlide key={banner} className="picture-slider__slides">
              <img src={banner} alt="b" className="picture-slider__img" />
            </SwiperSlide>
          ))}
        </Swiper>

        <ButtonIcon
          type="event"
          shape="right"
          dynamicClasses={['large']}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
