import { useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PhotoSliderStyles.scss';
export function MySlider() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const handlePrevSlide = () => swiper?.slidePrev();
  const handleNextSlide = () => swiper?.slideNext();
  const onSwiperInit = (swiperInit: SwiperClass) => setSwiper(swiperInit);
  return (
    <>
      <div className="outerSliderWrapper">
        <button onClick={handlePrevSlide} className="customPrev">
          &lt;
        </button>
        <div className="sliderWrapper">
          <div className="sliderContainer">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
                el: '.custom-pagination',
                renderBullet: (index, className) => {
                  return `<span class="${className} custom-bullet"></span>`;
                },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              onSwiper={onSwiperInit}
              className="slider"
            >
              <SwiperSlide>
                <img src="/react_phone-catalog/img/banner-phones.png" alt="1" className="slide_Image zeroSlide" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/react_phone-catalog/img/banner-accessories.png" alt="2" className="slide_Image firstSlide" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/react_phone-catalog/img/banner-tablets.png" alt="3" className="slide_Image secondSlide" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <button onClick={handleNextSlide} className="customNext">
          &gt;
        </button>
      </div>
      <div className="custom-pagination" />
    </>
  );
}
