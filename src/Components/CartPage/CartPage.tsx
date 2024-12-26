import pageCart from './CartPage.module.scss';
import './swiperInCartPage.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import { Product } from '../types/Product';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';

type Props = {
  showedProducts: Product[];
  swiperTitle: string;
};

export const CartPage = ({ showedProducts, swiperTitle }: Props) => {
  const { themeSwitcher } = useContext(CatalogContext);

  return (
    <>
      <div className="CartPage" data-theme={themeSwitcher ? 'dark' : 'light'}>
        <div className={pageCart.container}>
          <h2 className={pageCart.title}>{swiperTitle}</h2>
          <div className={pageCart.arrow}>
            <button className="CartPage__arrowleft">{'<'}</button>
            <button className="CartPage__arrowright">{'>'}</button>
          </div>
        </div>
        <div className={pageCart.CartSwiperONDESKTOP}>
          {' '}
          <Swiper
            className={pageCart.CartSwiper}
            modules={[FreeMode, Navigation]}
            slidesPerView={4}
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
        <div className={pageCart.CartSwiperONTABLET}>
          {' '}
          <Swiper
            className={pageCart.CartSwiper}
            modules={[FreeMode, Navigation]}
            slidesPerView={3}
            spaceBetween={150}
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
        <div className={pageCart.CartSwiperONPHONE}>
          <Swiper
            className={pageCart.CartSwiper}
            modules={[FreeMode, Navigation]}
            slidesPerView={2}
            spaceBetween={180}
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
      </div>
    </>
  );
};
