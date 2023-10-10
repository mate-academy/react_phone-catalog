import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { widthDefinition } from '../../helper/widthDefinition';
import { Phone } from '../../Type/Phone';

import './hotPrice.scss';

type Props = {
  phones: Phone[],
};

export const HotPrice: React.FC<Props> = ({ phones }) => {
  const [windowWidth] = useState(window.innerWidth);
  const hotPhones = phones.filter(phone => phone.fullPrice > 1200)
    .sort((a, b) => b.fullPrice - a.fullPrice);

  // useEffect(() => {
  //   widthDefinition(windowWidth);
  // }, [window.innerWidth]);

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
          slidesPerView={widthDefinition(windowWidth)}
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
