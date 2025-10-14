import React from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import vaforiteImgSelected from './../../images/icons/Favourites (Heart Like)_2.svg';
import fakeImg from './../../images/img/phones//apple-iphone-11/black/00.webp';
import { ProductCard } from '../ProductCard';
import './NewModels.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

//
//
//  .swiper-button-next:after, .swiper-container-rtl .swiper-button-prev:after {
// content: '';
// }

// .swiper-button-prev:after, .swiper-container-rtl .swiper-button-prev:after {
// content: '';
// }
//

export const NewModels = () => {
  return (
    <section className="new-models slider">
      <div className="container slider__container">
        <h2 className="slider__title">Brand new models</h2>

        <Swiper
          className="swiper-slider"
          modules={[Navigation, A11y]}
          slidesPerView={4}
          spaceBetween={16}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>

        {/* <div className="slider__wrapper"> */}
        {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        {/* <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add card__add_selected">
                Add to cart
              </button>
              <a className="card__favorite card__favorite_selected">
                <img src={vaforiteImg} alt="" />
                <img src={vaforiteImgSelected} alt="" />
              </a>
            </div>
          </div>
          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div>
          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div>

          <div className="card">
            <img src={fakeImg} alt="" className="card__image" />
            <div className="card__title">
              Apple iPhone 14 Pro 128GB Silver (MQ023)
            </div>
            <div className="card__price">$999</div>
            <div className="card__info">
              <div className="card__param">
                <span className="card__param_name">Screen</span>
                <span className="card__param_value">6.1” OLED</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">Capacity</span>
                <span className="card__param_value">128 GB</span>
              </div>
              <div className="card__param">
                <span className="card__param_name">RAM</span>
                <span className="card__param_value">6 GB</span>
              </div>
            </div>
            <div className="card__buttons">
              <button className="card__add">Add to cart</button>
              <a className="card__favorite">
                <img src={vaforiteImg} alt="" />
              </a>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};
