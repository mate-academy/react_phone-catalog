/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../utils/fetchProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Card } from '../Card/Card';
import { Loader } from '../Loader';

export const HotPrices: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const sortedProducts = await fetchProducts();

        setProducts(sortedProducts);
      } catch {
        throw new Error('Something went wrong, while loading hot prices');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container">
      <div className="hot-prices">
        <div className="hot-prices__header">
          <h2 className="hot-prices__header--title">Hot Prices</h2>
          <div className="hot-prices__header--buttons hot-prices__slider--buttons">
            <button className="hot-prices__slider--btn hot-prices__slider--btn-prev"></button>
            <button className="hot-prices__slider--btn hot-prices__slider--btn-next"></button>
          </div>
        </div>
        <div className="hot-prices__swiper">
          {isLoading ? (
            <Loader />
          ) : (
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
                  <Card product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};
