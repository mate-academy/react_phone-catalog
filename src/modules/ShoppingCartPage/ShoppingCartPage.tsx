import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getData } from '../../utils/fetchClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import shoppingCartPageStyles from './ShoppingCartPage.module.scss';
import { Loader } from '../../components/Loader';

export const ShoppingCartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getData<Product[]>('products.json').then(setProducts);
  }, []);

  const colorSet = Array.from(new Set(products.map(product => product.color)));

  return (
    // <Swiper
    //   modules={[Navigation, Pagination]}
    //   spaceBetween={10}
    //   slidesPerView="auto"
    //   // navigation
    //   // pagination={{ clickable: true }}
    // >
    //   {colorSet.map(color => (
    //     <SwiperSlide key={color} className={shoppingCartPageStyles.slide}>
    //       <span className={shoppingCartPageStyles.span}>{color}</span>
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    <Loader />
  );
};
