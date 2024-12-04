import pageCart from './CartPage.module.scss';
import './swiperInCartPage.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import { Product } from '../types/Product';

type Props = {
  showedProducts: Product[];
  swiperTitle: string;
};

export const CartPage = ({ showedProducts, swiperTitle }: Props) => {
  return (
    <>
      <div className="CartPage">
        <div className={pageCart.container}>
          <h2 className={pageCart.title}>{swiperTitle}</h2>
          <div className={pageCart.arrow}>
            <button className="CartPage__arrowleft">{'<'}</button>
            <button className="CartPage__arrowright">{'>'}</button>
          </div>
        </div>
        <Swiper
          className={pageCart.CartSwiper}
          modules={[FreeMode, Navigation]}
          slidesPerView={3}
          freeMode={true}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: '.CartPage__arrowleft',
            nextEl: '.CartPage__arrowright',
          }}
        >
          {showedProducts.map(product => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard key={product.id} product={product} />{' '}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
