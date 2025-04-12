import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Swiper.style.scss';

import { getBanners, Banner } from '../../../api/fetchBanners';

export const CustomSwiper = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    getBanners()
      .then(setBanners)
      .catch(() => console.log('No banners received'));
  });

  return (
    <Swiper
      modules={[Navigation, A11y, Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
      }}
      loop={banners.length >= 3}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="home-swiper"
    >
      {banners.length > 0 &&
        banners.map((banner, index) => (
          <SwiperSlide key={index} className="home-swiper__slide">
            <img
              src={banner.image}
              alt={`Banner ${index + 1}`}
              className="home-swiper__slide__img"
            />
          </SwiperSlide>
        ))}

    </Swiper>
  );
};
