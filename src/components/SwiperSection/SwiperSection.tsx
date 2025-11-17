import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard';
import { AllProductsType } from '../../types/AllProductsType';

import style from './SwiperSection.module.scss';
import arrowLeft from '../../../public/img/Icons/arrow-left-Icon.svg';
import arrowRight from '../../../public/img/Icons/arrow-right-Icon.svg';

type Props = {
  title: string;
  products: AllProductsType[];
  showDiscount?: boolean;
};

export const SwiperSection: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}) => {
  // const id = title.toLocaleLowerCase().replace(/\s/g, '-');
  return (
    <div className={style.swiperSection}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          <h2>{title}</h2>
        </div>

        <div className={style.miniSwiper}>
          <div className={style.arrow} id="prev-button">
            <img src={arrowLeft} alt="Arrow Left" />
          </div>
          <div className={style.arrow} id="next-button">
            <img src={arrowRight} alt="Arrow Right" />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        // slidesPerView={3}
        slidesPerView="auto"
        navigation={{
          prevEl: '#prev-button',
          nextEl: '#next-button',
          disabledClass: 'arrowDisabled',
        }}
        className={style.swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              showDiscount={showDiscount}
            ></ProductCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
