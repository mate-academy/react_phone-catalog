import { memo, useMemo, useState } from 'react';
import cls from './productSlider.module.scss';
import { Slider } from '../../../../shared/ui/Slider';
import { SlideContent } from '../../../../shared/ui/Slider/Slider';
import { Swiper, SwiperOptions } from 'swiper/types';
import { ProductDetails } from '../../model/types/productDetails';
import { Thumbs } from 'swiper/modules';
import classNames from 'classnames';

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
      breakpoints: {
        // 400: {
        //   slidesPerView: 1.5,
        // },
        // 500: {
        //   slidesPerView: 2,
        // },
        // 767.98: {
        //   slidesPerView: 3,
        // },
        // 991.98: {
        //   slidesPerView: 4,
        // },
      },
    };
  }, [thumbsSwiper]);

  const thumbSliderOptions = useMemo<SwiperOptions>(() => {
    return {
      wrapperClass: `${cls['thumb-slider-wrapper']}`,
      // slideClass: `${cls['thumb-slider__slide']}`,
      slidesPerView: 5,
      spaceBetween: 8,
      observer: true,
      slideToClickedSlide: true,
      breakpoints: {
        639.98: {
          direction: 'vertical',
        },
        // 400: {
        //   slidesPerView: 1.5,
        // },
        // 500: {
        //   slidesPerView: 2,
        // },
        // 639.98: {
        //   slidesPerView: 2.5,
        // },
        // 767.98: {
        //   slidesPerView: 3,
        // },
        // 991.98: {
        //   slidesPerView: 4,
        // },
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
