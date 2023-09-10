import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper';
import classNames from 'classnames';
import { ProductCard } from './ProductCard';
import { Phone } from '../Type/Phone';
import '../style/main.scss';

type Props = {
  phones: Phone[],
};

export const NewModels: React.FC<Props> = ({ phones }) => {
  const hotPhones = phones.sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <div className="container--hot">
      <div className="hot__prices">
        <h1>Brand new models</h1>

        <div className="button__container">
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__left button__models--left',
            )}
          // disabled={buttonBack === 0}
          />
          <button
            type="button"
            aria-label="Mute volume"
            className={classNames(
              'button button__right button__models--right',
            )}
          // disabled={buttonNext === hotPhones.length}
          />
        </div>
      </div>

      <div className="product">
        <Swiper
          navigation={{
            nextEl: '.button__models--right',
            prevEl: '.button__models--left',
          }}
          slidesPerView={4}
          modules={[EffectFade, Navigation, Pagination]}
          className="swiper__models"
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
