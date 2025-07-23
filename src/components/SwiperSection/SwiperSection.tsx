import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PhoneCard } from '../PhoneCard';
import './swiperSection.scss';

type ProductInfo = {
  id: string;
  name: string;
  priceRegular: number;
  capacity: string;
  ram: string;
  screen: string;
  images: string[];
};

export const SwiperSection: React.FC = () => {
  const [phones, setPhones] = useState<ProductInfo[]>([]);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then((data: ProductInfo[]) => {
        const filtered = data.filter(phone => phone.id.includes('14-pro'));
        setPhones(filtered);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);

  return (
    <div className="swiper-section-wrapper">
      <div className="title-swiper-container">
        <h2>Brand new models</h2>

        <div className="mini-swiper">
          <div className="arrow arrow--left has-shadow-cursor">
            <img
              className="icon"
              src="./img/icons/ArrowLeft.svg"
              alt="Arrow Left"
            />
          </div>

          <div className="arrow arrow--right has-shadow-cursor">
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
          prevEl: '.arrow--left',
          nextEl: '.arrow--right',
        }}
        className="swiperSection"
      >
        {phones.map(phone => (
          <SwiperSlide key={phone.id}>
            <PhoneCard product={phone} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
