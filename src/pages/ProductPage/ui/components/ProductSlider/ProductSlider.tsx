import { memo, useMemo, useState } from 'react';
import cls from './productSlider.module.scss';
import { Slider } from '../../../../../shared/ui/Slider';
import { Swiper, SwiperOptions } from 'swiper/types';
import { ProductDetails } from '../../../model/types/productDetails';
import { Thumbs } from 'swiper/modules';
import classNames from 'classnames';
import { SlideContent } from '../../../../../shared/ui/Slider/Slider';

interface Props {
  className?: string;
  product: ProductDetails;
}

export const ProductSlider = memo(({ product, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | Swiper>(null);

  const sliderOptions = useMemo<SwiperOptions>(() => {
    return {
      wrapperClass: `${cls['products-slider__wrapper']}`,
      slidesPerView: 1,
      spaceBetween: 0,
      observer: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
      breakpoints: {},
    };
  }, [thumbsSwiper]);

  const thumbSliderOptions = useMemo<SwiperOptions>(() => {
    return {
      wrapperClass: `${cls['thumb-slider-wrapper']}`,
      slideActiveClass: `${cls['thumb-slider__slide-active']}`,
      slidesPerView: 5,
      spaceBetween: 8,
      observer: true,
      slideToClickedSlide: true,
      breakpoints: {
        639.98: {
          direction: 'vertical',
        },
      },
    };
  }, []);

  const slidesContent: SlideContent[] | undefined = product?.images.map(
    (img, index) => ({
      id: index,
      content: (
        <div className={cls['swiper-slide__content']}>
          <img src={`/${img}`} />
        </div>
      ),
    }),
  );

  const thumbSlidesContent: SlideContent[] | undefined = product?.images.map(
    (img, index) => ({
      id: index,
      content: (
        <div className={cls['thumb-slider__slide-content']}>
          <img src={`/${img}`} />
        </div>
      ),
    }),
  );

  const setSwiper = (swiper: Swiper) => {
    setThumbsSwiper(swiper);
  };

  return (
    <div className={classNames(cls.productSlider, className)}>
      <Slider
        className={cls.slider}
        classNameSlide={cls.slider__slide}
        options={sliderOptions}
        slidesContent={slidesContent}
        modules={[Thumbs]}
      />
      <Slider
        className={cls['thumb-slider']}
        classNameSlide={classNames(cls['thumb-slider__slide'])}
        options={thumbSliderOptions}
        slidesContent={thumbSlidesContent}
        onSwiper={setSwiper}
      />
    </div>
  );
});
