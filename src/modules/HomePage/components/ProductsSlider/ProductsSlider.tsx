import { FC, useRef, useState, useEffect } from 'react';
import { ProductCard as ProductCardType } from '../../../../services/api';
import { ProductCard } from '../../../shared/components/ProductCard';
import style from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title: string;
  products: ProductCardType[];
  showDiscount?: boolean;
  classNameSection?: string;
  titleClassName?: string;
  sliderWrapperClassName?: string;
}

export const ProductsSlider: FC<ProductsSliderProps> = ({
  title,
  products,
  showDiscount = true,
  classNameSection,
  titleClassName,
  sliderWrapperClassName,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(true);
  // Проверяем можно ли прокручивать
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      // Можно ли влево (если scrollLeft > 0)
      setCanGoLeft(scrollLeft > 0);

      // Можно ли вправо (если есть ещё контент)
      setCanGoRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();

    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener('scroll', checkScroll);

      return () => slider.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -212,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300); // Проверяем после анимации
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 212,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={`${style.section} ${classNameSection || ''}`}>
      <div className={style.header}>
        <h2 className={`${style.title} ${titleClassName || ''}`}>{title}</h2>

        <div className={style.controls}>
          <button
            className={style.arrowLeft}
            onClick={handlePrev}
            disabled={!canGoLeft} // Disable когда в начале
            aria-label="Previous"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="-0.5"
                y="0.5"
                width="31"
                height="31"
                transform="matrix(-1 0 0 1 31 0)"
                stroke="#E2E6E9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.4712 11.5286C18.2109 11.2683 17.7888 11.2683 17.5284 11.5286L13.5284 15.5286C13.2681 15.789 13.2681 16.2111 13.5284 16.4714L17.5284 20.4714C17.7888 20.7318 18.2109 20.7318 18.4712 20.4714C18.7316 20.2111 18.7316 19.789 18.4712 19.5286L14.9426 16L18.4712 12.4714C18.7316 12.2111 18.7316 11.789 18.4712 11.5286Z"
                fill="#B4BDC4"
              />
            </svg>
          </button>
          <button
            className={style.arrowRight}
            onClick={handleNext}
            disabled={!canGoRight} // Disable когда в конце
            aria-label="Next"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="31" height="31" stroke="#B4BDC4" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5288 11.5286C13.7891 11.2683 14.2112 11.2683 14.4716 11.5286L18.4716 15.5286C18.7319 15.789 18.7319 16.2111 18.4716 16.4714L14.4716 20.4714C14.2112 20.7318 13.7891 20.7318 13.5288 20.4714C13.2684 20.2111 13.2684 19.789 13.5288 19.5286L17.0574 16L13.5288 12.4714C13.2684 12.2111 13.2684 11.789 13.5288 11.5286Z"
                fill="#313237"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={`${style.sliderWrapper} ${sliderWrapperClassName || ''}`}>
        <div className={style.slider} ref={sliderRef}>
          {products.map(product => (
            <div key={product.id} className={style.slideItem}>
              <ProductCard
                key={product.id}
                product={product}
                showDiscount={showDiscount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
