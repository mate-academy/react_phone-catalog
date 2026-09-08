import React from 'react';
import style from './NewModel.module.scss';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import arrowLeft from '../../../../shared/icons/chevron-arrow-left.svg';
import arrowRight from '../../../../shared/icons/chevron-arrow-right.svg';
import { useMediaQuery } from '@uidotdev/usehooks';
import { ProductCart } from '@/components/ProductCart/ProductCart';
import { Product } from '@/types/Products';

type Props = {
  products: Product[];
  isDiscount: boolean;
};

export const NewModel: React.FC<Props> = ({ products, isDiscount }) => {
  const isTablet = useMediaQuery('(min-width: 640px)');
  const isDesctop = useMediaQuery('(min-width: 1200px)');

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
        <h1 className={style.title}>Brand New Model</h1>
        <div className={style.navigation}>
          <div id="swiper-new-brand-prev" className={style.navigationPrev}>
            <img src={arrowLeft} alt="arrow left" className={style.arrowPrev} />
          </div>

          <div id="swiper-new-brand-next" className={style.navigationNext}>
            <img src={arrowRight} alt="arrow right" className={style.arrowNext} />
          </div>
        </div>
      </div>

      <div className={style.slider}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={slidesView}
          navigation={{
            nextEl: `#swiper-new-brand-next`,
            prevEl: `#swiper-new-brand-prev`,
          }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <div className={style.slideContent}>
            {products.map(phone => (
              <SwiperSlide key={phone.id} className={style.slides}>
                <ProductCart product={phone} isDiscount={isDiscount} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};
