import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import './ProductsSlider.scss';
import { Product } from '@/types';
import 'swiper/css';
import { ProductCard } from '@/features/product/components/ProductCard/ProductCard';
import { useTheme } from '@/app/providers/ThemeContext';
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon';
type Props = {
  products: Product[];
  title: string;
  showDiscount?: boolean;
};
const NavButton: React.FC<{
  direction: 'prev' | 'next';
  onClick?: () => void;
  disabled?: boolean;
}> = ({ direction, onClick, disabled }) => {
  const { theme } = useTheme();

  return (
    <button
      className={cn(
        'productsSlider__button',
        `productsSlider__button--${direction}`,
        { 'productsSlider__button--disabled': disabled },
        { 'productsSlider__button--dark': theme === 'dark' },
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowIcon direction={direction === 'prev' ? 'left' : 'right'} />
    </button>
  );
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  showDiscount = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDisabledPrev = activeIndex === 0;
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  return (
    <section className="productsSlider">
      <div className="productsSlider__header">
        <h2 className="productsSlider__title">{title}</h2>
        {products.length > 0 && (
          <div className="productsSlider__controls">
            <NavButton direction="prev" disabled={isDisabledPrev} />
            <NavButton direction="next" disabled={isDisabledNext} />
          </div>
        )}
      </div>
      <Swiper
        onSlideChange={swiper => {
          setActiveIndex(swiper.activeIndex);
          setIsDisabledNext(swiper.isEnd);
        }}
        className="productsSlider__swiper"
        spaceBetween={16}
        slidesPerView={4}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          550: {
            slidesPerView: 2,
          },
          758: {
            slidesPerView: 3,
          },
          940: {
            slidesPerView: 3.5,
          },
          1199: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: '.productsSlider__button--next',
          prevEl: '.productsSlider__button--prev',
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard item={product} showDiscount={showDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
