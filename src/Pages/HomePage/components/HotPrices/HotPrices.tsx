import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { ProductCard } from '../../../../Components/ProductCard/ProductCard';
import { Phone } from '../../../../Type/Phone';

import '../../../../style/main.scss';

type Props = {
  phones: Phone[],
};

export const HotPrices: React.FC<Props> = ({ phones }) => {
  const hotPhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <div className="container--hot">
      <div className="hot__prices">
        <h1>Hot prices</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__left button__hot--left',
            )}
          // disabled={buttonBack === 0}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__right button__hot--right',
            )}
          // disabled={buttonNext === hotPhones.length}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.button__hot--right',
            prevEl: '.button__hot--left',
          }}
          slidesPerView={4}
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

    </div>
  );
};
