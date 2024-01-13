import React, { useCallback, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { banners } from '../../helpers/utils/constants';
import './PicturesSlider.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { ButtonEvent } from '../../elements/Buttons/ButtonEvent/ButtonEvent';

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
        <ButtonEvent
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

        <ButtonEvent
          shape="right"
          dynamicClasses={['large']}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
