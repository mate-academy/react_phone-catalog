import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { twMerge } from 'tailwind-merge';
import { ProductCard } from './ProductCard';
import { SliderButton } from './SliderButton';
import { Product } from '../types/product';
import arrowIcon from '../images/icons/arrow-icon.svg';
import arrowDisableInon from '../images/icons/arrow-icon-disable.svg';

interface Props extends React.HTMLAttributes<HTMLElement> {
  discount?: boolean;
  className?: string;
  title: string;
  products: Product[];
  swiperProps?: SwiperProps;
}

export const ListOfProductCards: React.FC<Props> = ({
  className = '',
  discount = true,
  title,
  products,
  swiperProps = {},
  ...rest
}) => {
  const [slider, setSlider] = useState({
    first: true,
    last: false,
  });
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

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

  useEffect(() => {
    swiper?.update();
  }, [products, swiper]);

  return (
    <section className={twMerge('flex flex-col gap-6', className)} {...rest}>
      <div className="flex items-center justify-between">
        <h3>{title}</h3>

        <div className="flex justify-between gap-4">
          <SliderButton id="list-card-prew-button" disabled={slider.first}>
            <img
              src={slider.first ? arrowDisableInon : arrowIcon}
              alt="Slide left"
              className="-rotate-90"
            />
          </SliderButton>
          <SliderButton id="list-card-next-button" disabled={slider.last}>
            <img
              src={slider.last ? arrowDisableInon : arrowIcon}
              alt="Slide right"
              className="rotate-90"
            />
          </SliderButton>
        </div>
      </div>
      <Swiper
        onSlideChange={handleSlideChange}
        className="flex w-full gap-4"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween="16px"
        grabCursor={true}
        slidesPerView="auto"
        onSwiper={setSwiper}
        onUpdate={handleSlideChange}
        navigation={{
          prevEl: '#list-card-prew-button',
          nextEl: '#list-card-next-button',
        }}
        {...swiperProps}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className="w-auto">
            <ProductCard product={product} discount={discount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
