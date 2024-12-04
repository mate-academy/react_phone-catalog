import { useContext } from 'react';
import discount from './Discounts.module.scss';
import './SwiperOfHotPrices.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { CatalogContext } from '../CatalogProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export const Discounts = () => {
  const { products } = useContext(CatalogContext);

  const getProductsWithDiscount = products.sort((a, b) => b.price - a.price);

  return (
    <>
      <div className={discount.container}>
        <h2 className={discount.title}>Hot Prices</h2>
        <div className={discount.arrow}>
          <button className="Discounts__arrowleft">{'<'}</button>
          <button className="Discounts__arrowright">{'>'}</button>
        </div>
      </div>
      <Swiper
        className={discount.CartSwiper}
        modules={[Navigation]}
        navigation={{
          prevEl: '.Discounts__arrowleft',
          nextEl: '.Discounts__arrowright',
        }}
      >
        {getProductsWithDiscount.map(product => {
          return (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />{' '}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
