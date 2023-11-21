import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phone } from '../../Type/Phone';

import './likeAlso.scss';

type Props = {
  phones: Phone[],
};

export const LikeAlso: React.FC<Props> = ({ phones }) => {
  const likePhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <section className="like">
      <div className="like__wrapper">
        <h1 className="like__title">You may also like</h1>

        <div className="like__button">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'like__button like__button--left',
            )}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'like__button like__button--right',
            )}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.like__button--right',
            prevEl: '.like__button--left',
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
