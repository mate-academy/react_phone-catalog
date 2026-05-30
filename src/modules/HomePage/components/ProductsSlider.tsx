import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation } from 'swiper/modules';
import { ProductItem } from '../../shared/ProductItem';
import { Product } from '../../shared/types/Product';
import style from './ProductsSlider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  title: string;
  productsToShow: Product[];
  discount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  productsToShow,
  discount,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  return (
    <div className={style.products}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.controls}>
          <button
            className={style.prev}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <img src="icons/arrow-left.svg" alt="Previous" />
          </button>
          <button
            className={style.next}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <img src="icons/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>

      <div className={style.slider}>
        <Swiper
          modules={[Navigation]}
          onSwiper={swiper => (swiperRef.current = swiper)}
          spaceBetween={16}
          slidesPerView={4}
          breakpoints={{
            1400: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 1.5,
            },
            320: {
              slidesPerView: 1,
            },
          }}
          grabCursor={true}
          loop={true}
          centeredSlides={false}
        >
          {productsToShow.map(product => (
            <SwiperSlide key={product.id}>
              <ProductItem product={product} discount={discount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
