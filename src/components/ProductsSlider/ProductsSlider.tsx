import React from 'react';
import { Products } from '../../types/Products';
import './ProductsSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  product: Products[];
};

export const ProductsSlider: React.FC<Props> = ({ product }) => {
  const newProducts = [...product]
    .sort((a: Products, b: Products) => b.year - a.year)
    .slice(0, 10);

  return (
    <section className="slider-block">
      <div className="slider-block__header">
        <h2 className="slider-block__text">Brand new models</h2>
        <div className="slider-block__navigation">
          <div className="swiper-button-prev">
            <img src="./icons/left.svg" alt="left" />
          </div>
          <div className="swiper-button-next">
            <img src="./icons/right.svg" alt="right" />
          </div>
        </div>
      </div>
      <div className="slider">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          slidesPerView={1.5}
          spaceBetween={16}
          loop={false}
        >
          {newProducts.map(prod => {
            return (
              <SwiperSlide key={prod.id}>
                <div className="card-product">
                  <img
                    className="card-product__picture"
                    src={prod.image}
                    alt="iPhone 14"
                  />
                  <p className="card-product__name">{prod.name}</p>
                  <p className="card-product__price">{prod.price}</p>
                  <div className="card-product__block">
                    <p className="card-product__block-title">Screen</p>
                    <p className="card-product__block-text">{prod.screen}</p>
                  </div>
                  <div className="card-product__block">
                    <p className="card-product__block-title">Capacity</p>
                    <p className="card-product__block-text">{prod.capacity}</p>
                  </div>
                  <div className="card-product__block">
                    <p className="card-product__block-title">RAM</p>
                    <p className="card-product__block-text">{prod.ram}</p>
                  </div>
                  <div className="card-product__buttons">
                    <button className="card-product__button-add">
                      Add to cart
                    </button>
                    <button className="card-product__button-like">
                      <img src="./icons/like.svg" alt="like" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
