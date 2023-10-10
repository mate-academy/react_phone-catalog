import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { Phone } from '../../Type/Phone';
import { ProductCard } from '../ProductCard/ProductCard';

import './newModels.scss';

type Props = {
  phones: Phone[],
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
            className={classNames(
              'models__button models__button--left',
            )}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'models__button models__button--right',
            )}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.models__button--right',
            prevEl: '.models__button--left',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[EffectFade, Navigation, Pagination]}
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
