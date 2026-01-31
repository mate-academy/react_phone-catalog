/* eslint-disable @typescript-eslint/indent */
/* eslint max-len: "off" */
import { Swiper, SwiperSlide } from 'swiper/react';
import './ModelsSlider.scss';
import { Navigation } from 'swiper/modules';
import { ProductsType } from '../../../types/ProductsType';
import React from 'react';
import { ProductCard } from '../ProductCard';
import { SkeletProductCard } from '../../../components/Skelet/SkeletProductCard';
import { useTheme } from '../../../components/context/ThemeContext';

type Props = {
  title: string;
  products: ProductsType[];
  showDiscount?: boolean;
  isSkelet?: boolean;
};

export const ModelsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
  isSkelet,
}) => {
  const { theme } = useTheme();
  const id = title.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="slider">
      <div className="slider__section">
        <div className="slider__section--title">
          <h2 className="title">{title}</h2>
        </div>
        <div className="slider__section--arrows">
          <button
            className={`slider__buttonMini--arrowLeft arrow__arrowLeft--${id}`}
          >
            <img
              className="icon"
              src={
                theme === 'light'
                  ? import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg'
                  : import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg' // PLS DONT FORHET ADD DARK ICON
              }
              alt="Arrow left"
            />
          </button>
          <button
            className={`slider__buttonMini--arrowRight arrow__arrowRight--${id}`}
          >
            <img
              className="icon"
              src={
                theme === 'light'
                  ? import.meta.env.BASE_URL + 'img/icons/Arrow-Right_icon.svg'
                  : import.meta.env.BASE_URL + 'img/icons/Arrow-Right_dark.svg' //u know, dark icon's
              }
              alt="Arrow Right"
            />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation={{
          prevEl: `.arrow__arrowLeft--${id}`,
          nextEl: `.arrow__arrowRight--${id}`,
          disabledClass: 'arrow--disabled',
        }}
        className="swiper-section"
      >
        {isSkelet
          ? Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletProductCard />
              </SwiperSlide>
            ))
          : products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} showDiscount={showDiscount} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
