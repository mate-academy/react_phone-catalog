import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../utils/fetchProducts';
import { Card } from '../Card';

export const HotPrices: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const sortedProducts = await fetchProducts();

      setProducts(sortedProducts);
    };

    loadProducts();
  }, []);

  return (
    <div className="container">
      <div className="hot-prices">
        <div className="hot-prices__header">
          <h2 className="hot-prices__header--title">Hot Prices</h2>
          {/* eslint-disable max-len */}
          <div className="hot-prices__header--buttons hot-prices__slider--buttons">
            <button className="hot-prices__slider--btn hot-prices__slider--btn-prev"></button>
            <button className="hot-prices__slider--btn hot-prices__slider--btn-next"></button>
          </div>
        </div>
        <div className="hot-prices__swiper">
          <Swiper
            className="hot-prices__list"
            spaceBetween={16}
            slidesPerView={1.5}
            speed={1000}
            navigation={{
              prevEl: '.hot-prices__slider--btn-prev',
              nextEl: '.hot-prices__slider--btn-next',
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                spaceBetween: 16,
                slidesPerView: 1.5,
              },
              450: {
                spaceBetween: 16,
                slidesPerView: 2,
              },
              640: {
                spaceBetween: 16,
                slidesPerView: 2.5,
              },
              800: {
                spaceBetween: 16,
                slidesPerView: 3,
              },
              1000: {
                spaceBetween: 16,
                slidesPerView: 3.5,
              },
              1200: {
                spaceBetween: 16,
                slidesPerView: 4,
                loop: false,
              },
            }}
          >
            {products.map(product => (
              <SwiperSlide
                className="hot-prices__list--card hot-prices__card"
                key={product.id}
              >
                <Card product={product} key={product.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
