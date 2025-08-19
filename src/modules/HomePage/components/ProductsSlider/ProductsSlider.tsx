import React, { useState } from 'react';
import productsSlider from './ProductsSlider.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductCard } from '../../../shared/ProductCard';
import { getSortedProducts } from '../../../../utils/sortProducts';
import { Product } from 'types/Product';
import { BlockTitle } from 'types/BlockTitle';

type Props = {
  products: Product[];
  title: BlockTitle;
  sortBy: string;
  showDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  sortBy,
  showDiscount,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);

  const updateButtonsState = (swiper: SwiperClass) => {
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
  };

  const handleSwiperInit = (swiper: SwiperClass) => {
    setSwiperInstance(swiper);
    updateButtonsState(swiper);
  };

  const sortedProducts = getSortedProducts(products, sortBy);

  return (
    <>
      <div className={productsSlider['products-slider']}>
        <div className={productsSlider['products-slider__header']}>
          <h2 className={productsSlider['products-slider__subtitle']}>
            {title}
          </h2>
          <div className={productsSlider['products-slider__container']}>
            <button
              className={`${productsSlider.arrow} ${productsSlider['arrow-left']}`}
              onClick={() => swiperInstance?.slidePrev()}
              disabled={canSlidePrev}
            />
            <button
              className={`${productsSlider.arrow} ${productsSlider['arrow-right']}`}
              onClick={() => swiperInstance?.slideNext()}
              disabled={canSlideNext}
            />
          </div>
        </div>
        <div className={productsSlider['swiper-container']}>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={'auto'}
            onSwiper={handleSwiperInit}
            onSlideChange={swiper => updateButtonsState(swiper)}
            centeredSlides={false}
            navigation={{
              nextEl: null,
              prevEl: null,
            }}
            pagination={{
              clickable: true,
              el: '.products-slider__container',
            }}
            className={productsSlider['my-swiper']}
          >
            {sortedProducts.slice(0, 10).map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} showDiscount={showDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
