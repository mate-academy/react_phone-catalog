import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import './ProductsSlider.scss';
import { Product } from '@/types';
import 'swiper/css';
import { ProductCard } from '@/modules/shared/components/ProductCard/ProductCard';
import { useTheme } from '@/context/ThemeContext';
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
      {direction === 'prev' ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.4712 3.52864C10.2109 3.26829 9.78878 3.26829 9.52843 3.52864L5.52843 7.52864C5.26808 7.78899 5.26808 8.2111 5.52843 8.47145L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00004L10.4712 4.47145C10.7316 4.2111 10.7316 3.78899 10.4712 3.52864Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
            fill="currentColor"
          />
        </svg>
      )}
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
