import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Slider.scss';
import { OrderNow } from '../OrderNow';

const slides = [
  { link: './img/hero/02.jpg', slideId: 'slide1', isInfo: true },
  { link: './img/hero/01.jpg', slideId: 'slide2', isInfo: false },
  { link: './img/hero/03.jpg', slideId: 'slide3', isInfo: false },
];

export const Slider: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideTo = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
      setActiveIndex(index);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      setActiveIndex(swiperRef.current.realIndex);
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      setActiveIndex(swiperRef.current.realIndex);
    }
  };

  return (
    <div className="Slider">
      <div className="Slider__wrapper">
        <button
          className="Slider__navigation Slider__navigation--prev"
          onClick={handlePrevClick}
        >
          <img src="/img/icons/arrow-left.svg" alt="Left" />
        </button>

        <div className="Slider__slider">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={700}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
            }}
          >
            {slides.map(slide => (
              <SwiperSlide key={slide.slideId}>
                {slide.isInfo && (
                  <OrderNow
                    url="../phones/apple-iphone-14-pro-1tb-spaceblack"
                    title="Now available in our store!"
                    subtitle="Be the first!"
                  />
                )}
                <img
                  src={slide.link}
                  alt="Content Image"
                  className={cn({ Slider__right: slide.slideId === 'slide1' })}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          className="Slider__navigation Slider__navigation--next"
          onClick={handleNextClick}
        >
          <img src="/img/icons/arrow-right.svg" alt="Right" />
        </button>
      </div>

      <div className="Slider__pagination">
        {slides.map((_, index: number) => (
          <button
            className={cn('Slider__bullet', {
              'Slider__bullet--active': activeIndex === index,
            })}
            key={index}
            onClick={() => handleSlideTo(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
