import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import FirstBanner from './../../../../img/banner-phones.png';
import SecondBanner from './../../../../img/banner-tablets.png';
import ThirdBanner from './../../../../img/banner-accessories.png';

import './BannerSlider.scss';

const banners = [FirstBanner, SecondBanner, ThirdBanner];

export const BannerSlider = () => {
  return (
    <section className="banner">
      <div className="banner-slider-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
        >
          {banners.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image}
                alt={`Banner ${idx + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
