import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/getData';
import { Card } from '../Card';
import { Loader } from '../Loader';

export const NewModels: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts.filter(product => product.year >= 2022));
      } catch {
        throw new Error('Something went wrong, while loading products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="new-models">
        <div className="new-models__header">
          <h2 className="new-models__header--title">Brand new models</h2>
          {/* eslint-disable max-len */}
          <div className="new-models__header--buttons new-models__slider--buttons">
            <button className="new-models__slider--btn new-models__slider--btn-prev"></button>
            <button className="new-models__slider--btn new-models__slider--btn-next"></button>
          </div>
        </div>
        <div className="new-models__swiper">
          {isLoading ? (
            <Loader />
          ) : (
            <Swiper
              className="new-models__list"
              spaceBetween={16}
              slidesPerView={1.5}
              speed={1000}
              navigation={{
                prevEl: '.new-models__slider--btn-prev',
                nextEl: '.new-models__slider--btn-next',
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
                  className="new-models__list--card new-models__card"
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
