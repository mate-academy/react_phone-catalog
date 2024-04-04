import { Product } from '../types/products';
import { ArrowButton } from './ArrowButton';
import SwiperCore from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { ProductCard } from './ProductCard';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  slides: Product[];
  discount?: boolean;
  className?: string;
  swiperProps?: SwiperProps;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  slides,
  discount = true,
  className = '',
  swiperProps = {},
  ...rest
}) => {
  const [slider, setSlider] = useState({
    first: true,
    last: false,
  });

  const handleSlideChange = (item: SwiperCore) => {
    setSlider({
      first: false,
      last: false,
    });
    if (item.isBeginning || item.isEnd) {
      setSlider({
        first: item.isBeginning,
        last: item.isEnd,
      });
    }
  };

  return (
    <div
      className={twMerge('flex flex-col gap-6 md:gap-7', className)}
      {...rest}
    >
      <div className="flex justify-between">
        <h2>{title}</h2>
        <div className="flex gap-4">
          <ArrowButton
            disabled={slider.first}
            className="cursor-pointer"
            position="left"
            id="product-slider-prevEl"
          />
          <ArrowButton
            disabled={slider.last}
            className="cursor-pointer"
            position="right"
            id="product-slider-nextEl"
          />
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: '#product-slider-prevEl',
          nextEl: '#product-slider-nextEl',
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween="16px"
        className="flex w-full"
        {...swiperProps}
      >
        {slides.map(item => (
          <SwiperSlide className="w-auto" key={item.id}>
            <ProductCard product={item} discount={discount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
