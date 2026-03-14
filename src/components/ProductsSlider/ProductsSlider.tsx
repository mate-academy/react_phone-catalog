import { Products } from '../../types/Product';
import classNames from 'classnames';
import s from './ProductsSlider.module.scss';
import arrowLeft from '../../assets/images/icons/Chevron (Arrow Left).svg';
import arrowRight from '../../assets/images/icons/Chevron (Arrow Right).svg';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

type Props = {
  title: string;
  products: Products[];
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={s.container}>
      <div className={s.sliderHeader}>
        <h2 className={s.sliderTitle}>{title}</h2>
        <div className={s.sliderButtons}>
          <button
            type="button"
            ref={prevRef}
            className={classNames(s.sliderButton)}
            aria-label="Previous slide"
          >
            <img src={arrowLeft} alt="left" aria-hidden="true" />
          </button>
          <button
            type="button"
            ref={nextRef}
            className={classNames(s.sliderButton)}
            aria-label="Next slide"
          >
            <img src={arrowRight} alt="right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        grabCursor={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          disabledClass: s.disabled,
        }}
        onBeforeInit={(swiper) => {
          const nav = swiper.params.navigation;
          if (nav && typeof nav !== 'boolean') {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },

          640: {
            slidesPerView: 2.5,
          },

          1200: {
            slidesPerView: 4,
          },
        }}
        className={s.slider}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} className={s.productCardWrapper}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
