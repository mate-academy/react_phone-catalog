/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductType } from '../../types/ProductType';
import { ProductCard } from '../ProductCard';

interface Props {
  products: ProductType[];
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  slidesPerView640?: number | 'auto';
  slidesPerView1024?: number | 'auto';
  prevClass: string;
  nextClass: string;
}

export const Slider = ({
  products,
  spaceBetween = 16,
  slidesPerView = 1.5,
  slidesPerView640 = 2.5,
  slidesPerView1024 = 4,
  prevClass,
  nextClass,
}: Props) => {
  return (
    <div className="container">
      <div className="slider">
        <Swiper
          modules={[Navigation]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: slidesPerView640 },
            1024: { slidesPerView: slidesPerView1024 },
          }}
        >
          {products.map(prod => (
            <SwiperSlide key={prod.id}>
              <ProductCard product={prod} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
