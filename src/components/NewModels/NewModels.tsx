import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard/ProductCard';

import './NewModels.scss';

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

export const NewModels: React.FC<Props> = ({ phones }) => {
  const sliderPhones = phones.sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <section className="models">
      <div className="models__wrapper">
        <h1 className="models__title">Brand new models</h1>

        <div className="models__button">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(leftButtonClass)}
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
          className="swiper__models"
        >
          {sliderPhones.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard phone={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
