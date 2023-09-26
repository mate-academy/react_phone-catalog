import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phone } from '../../Type/Phone';

import './hotPrice.scss';

type Props = {
  phones: Phone[],
};

export const HotPrice: React.FC<Props> = ({ phones }) => {
  const hotPhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <div className="container--hot">
      <div className="slider__phones">
        <h1 className="slider__title">Hot prices</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__left button__slider--left',
            )}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__right button__slider--right',
            )}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.button__slider--right',
            prevEl: '.button__slider--left',
          }}
          slidesPerView={4}
          modules={[EffectFade, Navigation, Pagination]}
          className="swiper__slider"
        >
          {hotPhones.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard phone={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};
