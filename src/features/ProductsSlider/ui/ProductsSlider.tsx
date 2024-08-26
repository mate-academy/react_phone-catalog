/* eslint-disable max-len */
/* eslint-disable react/display-name */
import { memo, useMemo } from 'react';
import { Navigation, Virtual } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { SectionTop } from '../../../shared/ui/SectionTop/ui/SectionTop';
import { SlideContent, Slider } from '../../../shared/ui/Slider/Slider';
import classNames from 'classnames';
import cls from './productsSlider.module.scss';
import { Product, ProductCard } from '../../../entities/Product';
import icons from '../../../shared/styles/icons.module.scss';
import { useAppSelector } from '../../../shared/lib/hooks/reduxHooks';
import { getProducts } from '../../../entities/Product/model/selectors/getProducts';
import { Button, ButtonTheme } from '../../../shared/ui/forms';

interface Props {
  className?: string;
  title: string;
  products: Product[];
}

export const ProductsSlider = memo((props: Props) => {
  const { className, title, products } = props;
  const { isLoading } = useAppSelector(getProducts);

  const sliderOptions = useMemo<SwiperOptions>(() => {
    return {
      navigation: {
        prevEl: `.${cls['products-slider__button_prev']}`,
        nextEl: `.${cls['products-slider__button_next']}`,
      },
      wrapperClass: `${cls['products-slider__wrapper']}`,
      slidesPerView: 1.29,
      spaceBetween: 16,
      watchOverflow: true,
      observer: true,
      observeSlideChildren: true,
      virtual: { addSlidesAfter: 2 },
      breakpoints: {
        400: {
          slidesPerView: 1.5,
        },
        500: {
          slidesPerView: 2,
        },
        639.98: {
          slidesPerView: 2.5,
        },
        767.98: {
          slidesPerView: 3,
        },
        991.98: {
          slidesPerView: 4,
        },
      },
    };
  }, []);

  const controls = useMemo(
    () => (
      <div className={cls['products-slider__controls']}>
        <Button
          className={classNames(
            cls['products-slider__button'],
            cls['products-slider__button_prev'],
            icons['_icon-arrow'],
          )}
          theme={ButtonTheme.SQUARE}
        />
        <Button
          className={classNames(
            cls['products-slider__button'],
            cls['products-slider__button_next'],
            icons['_icon-arrow'],
          )}
          theme={ButtonTheme.SQUARE}
        />
      </div>
    ),
    [],
  );

  const slidesContent: SlideContent[] = products.map(product => ({
    id: product.id,
    content: <ProductCard cart={product} />,
  }));

  return (
    <div className={classNames(className, cls['products-slider'])}>
      <SectionTop
        title={title}
        className={`${cls['products-slider__top']}`}
        classNameTitle={`${cls['products-slider__title']}`}
      >
        {controls}
      </SectionTop>

      {!isLoading && (
        <Slider
          modules={[Navigation, Virtual]}
          options={sliderOptions}
          slidesContent={slidesContent}
          className={`${cls['products-slider']}`}
          classNameSlide={`${cls['products-slider__slide']}`}
        />
      )}
    </div>
  );
});
