/* eslint-disable @typescript-eslint/indent */
/* eslint max-len: "off" */
import { Swiper, SwiperSlide } from 'swiper/react';
import './ModelsSlider.scss';
import { Navigation } from 'swiper/modules';
import { ProductsType } from '../../../types/ProductsType';
import React from 'react';
import { ProductCard } from '../ProductCard/ProductsCard';
import { SkeletonProductCard } from '../../../components/Skeletons/SkeletonProductCard/SkeletonProductCard';
import { useTheme } from '../../../components/context/ThemeContext';

type Props = {
  title: string;
  products: ProductsType[];
  showDiscount?: boolean;
  isSkeleton?: boolean;
};
export const ModelsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
  isSkeleton,
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
            className={`slider__buttonMini--arrowLeft
          arrow__arrowLeft--${id}`}
          >
            <img
              className="icon"
              src={
                theme === 'light'
                  ? './img/icons/Arrow-Left_icon.svg'
                  : './img/icons/Arrow-Left_dark.svg'
              }
              alt="Arrow Left"
            />
          </button>
          <button
            className={`slider__buttonMini--arrowRight
            arrow__arrowRight--${id}`}
          >
            <img
              className="icon"
              src={
                theme === 'light'
                  ? './img/icons/Arrow-Right_icon.svg'
                  : './img/icons/Arrow-Right_dark.svg'
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
        {isSkeleton
          ? Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonProductCard />
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
