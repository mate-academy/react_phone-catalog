import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PhotoSliderStyles.scss';

export function MySlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="outerSliderWrapper">
      <button ref={prevRef} className="customPrev">
        &lt;
      </button>
      <div className="sliderWrapper">
        <div className="sliderContainer">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={swiper => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="slider"
          >
            <SwiperSlide>
              <img src="/img/BannerSlide2.svg" alt="1" className="slide_Image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/banner-tablets.png" alt="2" className="slide_Image firstSlide" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/img/category-accessories.png"
                alt="3"
                className="slide_Image secondSlide"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <button ref={nextRef} className="customNext">
        &gt;
      </button>
    </div>
  );
}
