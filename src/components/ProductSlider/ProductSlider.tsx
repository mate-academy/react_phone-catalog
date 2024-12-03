import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import arrowLeft from '../../assets/img/icons/arrow-left.svg';
import arrowRight from '../../assets/img/icons/arrow-right.svg';

import style from './ProductSlider.module.scss';
import { ProductCart } from '../ProductCart';
import { Product } from '../../types/Product';
type Props = {
  suggestedProducts: Product[];
  title: string;
  discount: boolean;
};
export const ProductSlider: React.FC<Props> = ({
  suggestedProducts,
  title,
  discount,
}) => {
  return (
    <section className={style.productSlider}>
      <div className={style.header}>
        <h3 className={style.title}>{title}</h3>
        <div className={style.buttons}>
          <button className={style.prevBtn}>
            <img className={style.icon} src={arrowLeft} alt="Arrow Left" />
          </button>
          <button className={style.nextBtn}>
            <img className={style.icon} src={arrowRight} alt="Arrow Right" />
          </button>
        </div>
      </div>
      <div className={style.swiper}>
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          modules={[Navigation]}
          speed={1000}
          breakpoints={{
            320: { slidesPerView: 1.4 },
            450: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            800: { slidesPerView: 3 },
            1000: { slidesPerView: 3.5 },
            1200: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: `.${style.nextBtn}`,
            prevEl: `.${style.prevBtn}`,
          }}
          className={style.list}
        >
          {suggestedProducts.map(product => {
            return (
              <SwiperSlide key={product.id} className={style.card}>
                <ProductCart product={product} discount={discount} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
