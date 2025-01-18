import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import style from './Carusel.module.scss';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import { MutableRefObject } from 'react';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  swiperRef: MutableRefObject<SwiperClass | null>;
};

export const Carusel: React.FC<Props> = ({ products, swiperRef }) => {
  const refSwiper = swiperRef;

  return (
    <div className={style.carusel}>
      <Swiper
        slidesPerView={1}
        pagination={true}
        centeredSlides={true}
        loop={false}
        onSwiper={swiperInstance => {
          refSwiper.current = swiperInstance;
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            centeredSlides: false,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            centeredSlides: false,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            centeredSlides: false,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            centeredSlides: false,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 1.3,
            centeredSlides: false,
            spaceBetween: 20,
          },
        }}
      >
        {products.map(phone => (
          <SwiperSlide key={phone.id}>
            <PhoneCard product={phone} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
