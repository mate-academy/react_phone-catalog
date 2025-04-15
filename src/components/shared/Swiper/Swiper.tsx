import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/swiper-bundle.css';
import './Swiper.style.scss';

import { getBanners, Banner } from '../../../api/fetchBanners';

type Props = {
  page: 'homePage' | 'productDetailsPage';
  thumbs?: string[];
};

export const CustomSwiper: React.FC<Props> = ({ page, thumbs }) => {
  if (page === 'homePage') {
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
  }

  if (page === 'productDetailsPage' && thumbs) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
      <div className="product-details">
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className="product-details__swiper product-details__swiper--main"
        >
          {thumbs.map((src, i) => (
            <SwiperSlide
              key={i}
              className="product-details__swiper--main__slide"
            >
              <img src={src} className="product-details__swiper--main__img" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView={thumbs.length}
          className="product-details__swiper product-details__swiper--thumbs"
        >
          {thumbs.map((src, i) => (
            <SwiperSlide
              key={i}
              className="product-details__swiper--thumbs__slide"
            >
              <img src={src} className="product-details__swiper--thumbs__img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};
