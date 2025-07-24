
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
  priceDiscount: number;
  capacity: string;
  ram: string;
  screen: string;
  images: string[];
};

type Props = {
  title: string;
  phones: ProductInfo[];
  showDiscount?: boolean;
}

export const SwiperSection: React.FC<Props> = ({ title, phones, showDiscount }) => {
  const id = title.toLowerCase().replace(/\s/g, '-');
  // const [phones, setPhones] = useState<ProductInfo[]>([]);

  // useEffect(() => {
  //   fetch('/api/phones.json')
  //     .then(res => res.json())
  //     .then((data: ProductInfo[]) => {
  //       const filtered = data.filter(phone => phone.id.includes('14-pro'));
  //       setPhones(filtered);
  //     })
  //     .catch(err => console.error('Ошибка загрузки телефонов:', err));
  // }, []);

  return (
    <div className="swiper-section-wrapper">
      <div className="title-swiper-container">
        <div className='section-title'>

        <h2>{title}</h2>
        </div>

        <div className="mini-swiper">
          <div className={`arrow arrow--left arrow--left-${id} has-shadow-cursor`}>
            <img
              className="icon"
              src="./img/icons/ArrowLeft.svg"
              alt="Arrow Left"
            />
          </div>

          <div className={`arrow arrow--right arrow--right-${id} has-shadow-cursor`}>
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
            <PhoneCard product={phone} showDiscount={showDiscount}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
