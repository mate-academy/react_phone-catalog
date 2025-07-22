import 'swiper/css';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './bannerSwiper.scss';

export const ArrowLeft = () => {
  const swiper = useSwiper();
  
  return (
    <button
      className="arrowLeft swiper-buttons"
      onClick={() => swiper.slidePrev()}
    >
      <img className="icon" src="./img/icons/ArrowLeft.svg" alt="Arrow Left" />
    </button>
  );
};

export const ArrowRight = () => {
  const swiper = useSwiper();
  return (
    <button
      className="arrowRight swiper-buttons"
      onClick={() => swiper.slideNext()}
    >
      <img
        className="icon"
        src="./img/icons/ArrowRight.svg"
        alt="Arrow Right"
      />
    </button>
  );
};

export const BannerSwiper = () => {
  const banner = [
    '/img/banner/55.svg',
    '/img/banner/watch.jpg',
    '/img/banner/headphones.png',
  ];

  return (
    <>
        <div className="banner-slider">
          <div className="slider-container">
            <ArrowLeft />

            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                nextEl: '.arrowRight',
                prevEl: '.arrowLeft',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                bulletClass: 'custom-bullet',
                bulletActiveClass: 'custom-bullet-active',
              }}
              className="bannerSwiper"
            >
              {banner.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="card"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <ArrowRight />
          </div>
        </div>

        <div className="pagination-container">
          <div className="swiper-pagination"></div>
        </div>
    </>
  );
}
