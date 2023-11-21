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
    <section className="hot">
      <div className="hot__wrapper">
        <h1 className="hot__title">Hot prices</h1>

        <div className="hot__button">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'hot__button hot__button--left',
            )}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'hot__button hot__button--right',
            )}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.hot__button--right',
            prevEl: '.hot__button--left',
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
          className="swiper__hot"
        >
          {hotPhones.map(phone => (
            <SwiperSlide key={phone.id}>
              <ProductCard phone={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};
