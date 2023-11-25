/* eslint-disable import/no-extraneous-dependencies */
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
]);

export const ProductCard: React.FC = () => {
  const banners = [
    {
      id: 1,
      src: '_new/img/banner-phones.png',
      alt: 'banner-phones',
    },
    {
      id: 2,
      src: '_new/img/banner-tablets.png',
      alt: 'banner-tablets',
    },
    {
      id: 3,
      src: '_new/img/banner-accessories.png',
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
        pagination={{
          clickable: true,
        }}
        navigation
        className="mySwiper"
        // onInit={(swiper) => console.log('Swiper initialized', swiper)}
        // onSlideChange={(swiper) => {
        //   console.log('Slide index changed to: ', swiper.activeIndex);
        // }}
        // onReachEnd={() => console.log('Swiper end reached')}
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
