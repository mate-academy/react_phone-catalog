import React, { useState } from 'react';
import style from './HotPrice.module.scss';
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
import { Product } from '../../../../type/Product';
import { useMediaQuery } from '@uidotdev/usehooks';

export const HotPrice: React.FC = () => {
  const phones: Product[] = phoneFromServer.slice(10, 19);
  const isTablet = useMediaQuery('(min-width: 640px)');
  const isDesctop = useMediaQuery('(min-width: 1200px)');

  const [isDiscount] = useState(true);

  let slidesView = 1.5;

  if (isTablet) {
    slidesView = 2.5;
  }

  if (isDesctop) {
    slidesView = 4;
  }
  return (
    <div className={style.container}>
      <div className={style.top}>
        <h1 className={style.title}>Hot Price</h1>
        <div className={style.navigation}>
          <div id="swiper-new-hotPrice-prev" className={style.navigationPrev}>
            <img src={arrowLeft} alt="arrow left" className={style.arrowPrev} />
          </div>

          <div id="swiper-new-hotPrice-next" className={style.navigationNext}>
            <img src={arrowRight} alt="arrow right" className={style.arrowNext} />
          </div>
        </div>
      </div>

      <div className={style.slider}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={slidesView}
          navigation={{
            nextEl: `#swiper-new-hotPrice-next`,
            prevEl: `#swiper-new-hotPrice-prev`,
          }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <div className={style.slideContent}>
            {phones.map(phone => (
              <SwiperSlide key={phone.id}>
                <ProductCart product={phone} isDiscount={isDiscount} key={phone.id}/>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};
