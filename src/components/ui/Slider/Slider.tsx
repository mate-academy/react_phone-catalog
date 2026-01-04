import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './/Slider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';
import ButtonSlider from '../ButtonSlider/ButtonSlider';

const slides: string[] = [
  'img/banner.png',
  'img/banner-phones.png',
  'img/banner-accessories.png',
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();

  return (
    <div className="Slider-wrapper">
      <div className="Slider__row">
        <ButtonSlider
          name="arrow-left"
          type="banner"
          onClick={handlePrev}
          disabled={false}
        />

        <Swiper
          slidesPerView={1}
          className="Slider"
          onSwiper={setSwiperInstance}
          onSlideChange={swiper => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {slides.map(slide => {
            return (
              <SwiperSlide
                key={slide}
                className={`Slider__slide ${activeIndex === 0 ? 'Slider__slide--first' : ''}`}
              >
                <img src={slide} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <ButtonSlider
          name="arrow-right"
          type="banner"
          onClick={handleNext}
          disabled={false}
        />
      </div>

      <div className="bullets">
        {slides.map((_, index) => {
          return (
            <div
              key={index}
              className={`bullets__bullet ${activeIndex === index ? 'active' : ''}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
