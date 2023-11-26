/* eslint-disable import/no-extraneous-dependencies */
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/a11y/a11y.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/autoplay';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
]);

export const ProductCard: React.FC = () => {
  const banners = [
    {
      id: 1,
      src: './img/banner-phones.png',
      alt: 'banner-phones',
    },
    {
      id: 2,
      src: './img/banner-tablets.png',
      alt: 'banner-tablets',
    },
    {
      id: 3,
      src: './img/banner-accessories.png',
      alt: 'banner-accessories',
    },
  ];

  return (
    <>
      <h1>Product Card</h1>
      <Swiper
        id="main"
        tag="section"
        wrapperTag="ul"
        slidesPerView={1}
        spaceBetween={30}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{
          clickable: true,
        }}
        navigation
        className="mySwiper"
      >
        {
          banners.map(banner => (
            <SwiperSlide key={banner.id} tag="li">
              <img
                className="swiper-image"
                src={banner.src}
                style={{ listStyle: 'none' }}
                alt={banner.alt}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
};
