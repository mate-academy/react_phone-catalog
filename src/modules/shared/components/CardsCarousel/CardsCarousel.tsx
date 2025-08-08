import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import carouselClass from './cardCarousel.module.scss';
import cn from 'classnames';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/effect-coverflow';
import { Navigation } from 'swiper/modules';
import { Product } from '../../../../types/ProductType';
import { CardProduct } from '../../../shared/components/CardProduct';
import { NavigationOptions } from 'swiper/types';
import { IconButton } from '../../../shared/components/IconButton';
import { IconEnum } from '../../../../types/iconsType';
import allProduct from '../../../../../public/api/products.json';
import { CategoriesType } from '../../../../types/PagesType';

type Props = {
  title: string;
  products?: Product[];
  category?: CategoriesType;
};

export const CardsCariusel: React.FC<Props> = React.memo(
  ({ title, products = [], category = '' }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [displayProducts, setDisplayProducts] = useState<Product[]>(products);

    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!products.length && category) {
        setDisplayProducts(
          allProduct.filter(product => product.category === category),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
      <div className={cn(carouselClass['card-carousel'])}>
        <div className={cn(carouselClass['card-carousel__top'], 'container')}>
          <h2 className={cn(carouselClass['card-carousel__title'])}>{title}</h2>
          <div className={cn(carouselClass['card-carousel__nav-content'])}>
            <div
              ref={prevRef}
              className={cn(
                carouselClass['card-carousel__nav'],
                carouselClass['card-carousel__nav--prev'],
              )}
            >
              <IconButton iconName={IconEnum.arrow} isDisabled={isBeginning} />
            </div>
            <div
              ref={nextRef}
              className={cn(
                carouselClass['card-carousel__nav'],
                carouselClass['card-carousel__nav--next'],
              )}
            >
              <IconButton iconName={IconEnum.arrow} isDisabled={isEnd} />
            </div>
          </div>
        </div>
        <div className={cn(carouselClass['card-carousel__swiper-container'])}>
          <Swiper
            className={cn(carouselClass['card-carousel__swiper'])}
            modules={[Navigation]}
            grabCursor={true}
            spaceBetween={16}
            slidesPerView="auto"
            onInit={instance => {
              const swiper = instance;

              if (swiper.params.navigation) {
                const navigation = swiper.params
                  .navigation as NavigationOptions;

                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }

              swiper.navigation.init();
              swiper.navigation.update();
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={swiper => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {displayProducts.map(product => (
              <SwiperSlide
                className={`${carouselClass['card-carousel__swiper-item']}`}
                key={product.id}
              >
                <CardProduct product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  },
);

CardsCariusel.displayName = 'CardsCariusel';
