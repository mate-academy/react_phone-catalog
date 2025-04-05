import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductsContext } from '../../context/ProductsContext';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import carouselStyles from './Carousel.module.scss';

export const Carousel = () => {
  const { categories } = useContext(ProductsContext);

  return (
    <div className={carouselStyles.carousel}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        className={carouselStyles.carousel__slider}
      >
        {categories.map(category => (
          <SwiperSlide key={category}>
            <img src="" alt="" className={carouselStyles.carousel__image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
