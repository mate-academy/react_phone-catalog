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
  const hotPhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <div className="container--hot">
      <div className="like__phones">
        <h1 className="like__title">You may also like</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__left button__like--left',
            )}
          // disabled={buttonBack === 0}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__right button__like--right',
            )}
          // disabled={buttonNext === hotPhones.length}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.button__like--right',
            prevEl: '.button__like--left',
          }}
          slidesPerView={4}
          modules={[EffectFade, Navigation, Pagination]}
          className="swiper__like"
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
