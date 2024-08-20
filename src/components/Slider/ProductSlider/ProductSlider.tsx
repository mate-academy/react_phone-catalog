import React, { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Slider, { Settings } from 'react-slick';
import classNames from 'classnames';
import './ProductSlider.scss';
import { Product } from '../../../types/product';
import { SCREEN_SIZES } from '../../../styles/utils/icons/screenSizes';
import { ProductCard, ProductCardSkeleton } from '../../ProductCard';
import { useTranslation } from 'react-i18next';

export const useProductSlider = (
  products: Product[],
  isLoading: boolean,
  byCategory = false,
  discount = false,
) => {
  const sliderRef = useRef<Slider>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { t } = useTranslation();

  const isTablet = useMediaQuery({ minWidth: SCREEN_SIZES.tabletMin });

  const isDesktop = useMediaQuery({ minWidth: SCREEN_SIZES.desktopMin });

  const slidesToShow = isDesktop ? 4 : isTablet ? 3 : 2;

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  const sliderSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    variableWidth: true,
    arrows: false,
    className: 'productSlider',
    afterChange(currentSlide) {
      setIsFirstSlide(currentSlide === 0);
      setIsLastSlide(currentSlide === products.length - slidesToShow);
    },
  };

  const sliderComponent = (
    <div className="slider-container">
      {byCategory && (
        <h2 className="productSlider-block--title">{t('You may also like')}</h2>
      )}
      {discount && (
        <h2 className="productSlider-block--title">{t('Hot prices')}</h2>
      )}
      {!discount && !byCategory && (
        <h2 className="productSlider-block--title">{t('Brand new models')}</h2>
      )}
      <div className="slider-buttons">
        <button
          className={classNames('button-slider button-slider--prev', {
            'button-slider__disabled': isFirstSlide,
          })}
          onClick={handlePrevClick}
        ></button>
        <button
          className={classNames('button-slider button-slider--next', {
            'button-slider__disabled': isLastSlide,
          })}
          onClick={handleNextClick}
        ></button>
      </div>
      <Slider {...sliderSettings} ref={sliderRef}>
        {isLoading &&
          [1, 2, 3, 4].map(count => <ProductCardSkeleton key={count} />)}
        {!isLoading &&
          products.map(product => (
            <div key={product.id}>
              <ProductCard product={product} discount={discount} />
            </div>
          ))}
      </Slider>
    </div>
  );

  return { sliderComponent };
};

export default useProductSlider;
