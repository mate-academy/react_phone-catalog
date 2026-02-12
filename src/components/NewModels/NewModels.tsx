import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import { Product } from '../../types/Product';
import { Card } from '../Card';
import { Loader } from '../Loader';
import { SliderButton } from '../SliderButton';
import { fetchProducts } from '../../utils/fetchProducts';

export const NewModels: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await fetchProducts();

        setProducts(
          loadedProducts
            .filter(product => product.year >= 2022)
            .sort((a, b) => b.year - a.year),
        );
      } catch {
        throw new Error('Something went wrong, while loading products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container">
      <div className="new-models">
        <div className="new-models__header">
          <h2 className="new-models__header--title">Brand new models</h2>
          {/* eslint-disable max-len */}
          <div className="new-models__header--buttons new-models__slider--buttons">
            <SliderButton
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
              className="new-models__slider--btn-prev"
              disabled={isBeginning}
            />
            <SliderButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
              className="new-models__slider--btn-next"
              disabled={isEnd}
            />
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
              onSwiper={swiper => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={swiper => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              modules={[Navigation]}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                },
                450: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 2.5,
                },
                800: {
                  slidesPerView: 3,
                },
                1000: {
                  slidesPerView: 3.5,
                },
                1200: {
                  slidesPerView: 4,
                  loop: false,
                },
              }}
            >
              {products.map(product => (
                <SwiperSlide
                  className="new-models__list--card new-models__card"
                  key={product.itemId}
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
