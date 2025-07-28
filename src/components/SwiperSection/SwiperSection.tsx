import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PhoneCard } from '../PhoneCard';
import './swiperSection.scss';
import { PhoneInfoType } from '../../types/PhoneInfoType';

type Props = {
  title: string;
  phones: PhoneInfoType[];
  showDiscount?: boolean;
};

export const SwiperSection: React.FC<Props> = ({
  title,
  phones,
  showDiscount,
}) => {
  const id = title.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="swiper-section-wrapper">
      <div className="title-swiper-container">
        <div className="section-title">
          <h2>{title}</h2>
        </div>

        <div className="mini-swiper">
          <div
            className={`arrow arrow--left arrow--left-${id} has-shadow-cursor`}
          >
            <img
              className="icon"
              src="./img/icons/ArrowLeft.svg"
              alt="Arrow Left"
            />
          </div>

          <div
            className={`arrow arrow--right arrow--right-${id} has-shadow-cursor`}
          >
            <img
              className="icon"
              src="./img/icons/ArrowRight.svg"
              alt="Arrow Right"
            />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation={{
          prevEl: `.arrow--left-${id}`,
          nextEl: `.arrow--right-${id}`,
          disabledClass: 'arrow--disabled',
        }}
        className="swiperSection"
      >
        {phones.map(phone => (
          <SwiperSlide key={phone.id}>
            <PhoneCard product={phone} showDiscount={showDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
