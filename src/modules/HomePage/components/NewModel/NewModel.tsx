import React from 'react';
import style from './NewModel.module.scss';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import arrowLeft from '../../../../shared/assets/icons/chevron-arrow-left.svg';
import arrowRight from '../../../../shared/assets/icons/chevron-arrow-right.svg';
import phoneFromServer from '../../../../../public/api/phones.json';
import { ProductCart } from '../../../../components/ProductCart/ProductCart';
import { Phone } from '../../../../type/phone';

export const NewModel: React.FC = () => {
  const phones: Phone[] = phoneFromServer.slice(-8);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <h1 className={style.title}>Brand New Model</h1>
        <div className={style.navigation}>
          <div className={style.navigationPrev}>
            <img src={arrowLeft} alt="arrow left" className={style.arrowPrev} />
          </div>

          <div className={style.navigationNext}>
            <img src={arrowRight} alt="arrow right" className={style.arrowNext} />
          </div>
        </div>
      </div>

      <div className={style.slider}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.5}
          navigation={{
            nextEl: `#swiper-button-next`,
            prevEl: `#swiper-button-prev`,
          }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <div className={style.slideContent}>
            {phones.map(phone => (
              <SwiperSlide key={phone.id}>
                <ProductCart phone={phone} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};
