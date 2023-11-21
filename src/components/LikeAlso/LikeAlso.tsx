import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phone } from '../../types/Phone';

import './LikeAlso.scss';

type Props = {
  phones: Phone[];
};

const leftButtonClass = classNames('hot__button hot__button--left');
const rightButtonClass = classNames('hot__button hot__button--right');

const swiperParams = {
  navigation: {
    nextEl: '.hot__button--right',
    prevEl: '.hot__button--left',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  },
  modules: [EffectFade, Navigation, Pagination],
};

export const LikeAlso: React.FC<Props> = ({ phones }) => {
  const likePhones = phones
    .filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <section className="like">
      <div className="like__wrapper">
        <h1 className="like__title">You may also like</h1>

        <div className="like__button">
          <button
            type="button"
            aria-label="Mute volume"
            className={leftButtonClass}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={rightButtonClass}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          {...swiperParams}
          className="swiper__like"
        >
          {likePhones.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard phone={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
