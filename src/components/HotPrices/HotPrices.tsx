/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { fetchProducts } from '../../utils/fetchProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Card } from '../Card/Card';
import { Loader } from '../Loader';
import { SliderButton } from '../SliderButton';

export const HotPrices: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const sortedProducts = (await fetchProducts())
          .filter(p => p.fullPrice && p.price)
          .sort((a, b) => b.fullPrice! - b.price! - (a.fullPrice! - a.price!));

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
            <SliderButton
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
              className="hot-prices__slider--btn-prev"
              disabled={isBeginning}
            />
            <SliderButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
              className="hot-prices__slider--btn-next"
              disabled={isEnd}
            />
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
                  className="hot-prices__list--card hot-prices__card"
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
