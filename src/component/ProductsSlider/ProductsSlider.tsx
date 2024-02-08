import React, { useContext, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ProductContext } from '../../ProductContext';
import { Product } from '../../Type/Product';
import { ProductCard } from '../ProductCard';

// import './ProductsSlider.scss';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  title: string;
  filterByYears?: number;
  sale: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  filterByYears,
  sale,
}) => {
  const { products } = useContext(ProductContext);

  const swiperRef = useRef<typeof Swiper | null>(null);

  const filteredProduct = (): Product[] => {
    if (filterByYears) {
      return products
        .filter((product) => product.year === filterByYears)
        .sort((a, b) => b.fullPrice - a.fullPrice);
    }

    return products;
  };

  return (
    <>
      <div className="phones-swiper-wrap">
        <h2 className="prise__title">
          {title}
        </h2>

        <div className="phones-swiper-buttons">
          <img
            src="./icon/Left.svg"
            alt="prev"
            className="phones-swiper-button phones-swiper-button-prev"
          />

          <img
            src="./icon/Right.svg"
            alt="next"
            className="phones-swiper-button phones-swiper-button-next"
          />
        </div>

      </div>

      <Swiper
        className="phones-swiper"
        slidesPerView={4}
        navigation={{
          prevEl: '.phones-swiper-button-prev',
          nextEl: '.phones-swiper-button-next',
        }}
        onSwiper={(swiper: typeof Swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, A11y]}
      >

        {filteredProduct().map((product) => (
          <SwiperSlide key={product.id} className="phones-swiper-slide">
            <ProductCard product={product} sale={sale} />
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
};
