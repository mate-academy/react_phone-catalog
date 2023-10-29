/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import './productsSlider.scss';

import { v4 as uuidv4 } from 'uuid';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
// import { scrollToTop } from '../../utils/scrollToTop';

type Props = {
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  return (
    <div
      className="swiper-container"
    >
      <div className="swiper-button-prev">
        <img
          className="swiper__arrow-left"
          src="new/img/icons/arrow-left.svg"
          alt="arrow-left"
        />
      </div>

      <Swiper
        spaceBetween={16}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          // 768: {
          //   slidesPerView: 2,
          // },
          1024: {
            slidesPerView: 3,
          },
          1136: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map(product => (
          <SwiperSlide
            key={uuidv4()}
            // onClick={scrollToTop}
          >
            <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-next">
        <img
          className="swiper__arrow-right"
          src="new/img/icons/arrow-right.svg"
          alt="arrow-right"
        />
      </div>
    </div>
  );
};
