/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import styles from './NewModelSlider.module.scss';
import Slider from 'react-slick';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { ProductCard } from '../ProductCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../ArrowsSlider';
import { ShowOldPriceContext } from '../../context/OldPrice';
import { CategoryType } from '../../types/Category';

export const ProductSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const price = useContext(ShowOldPriceContext);

  useEffect(() => {
    getProducts()
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((products: Product[]) => {
        setProducts(products);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  const newestProducts = [...products].sort(
    (product1, product2) => product2.year - product1.year,
  );

  const discountProducts = [...products].sort((product1, product2) => {
    const dicsount1 = product1.fullPrice - product1.price;
    const dicsount2 = product2.fullPrice - product2.price;

    return dicsount2 - dicsount1;
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: { slidesToShow: 3 },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: { slidesToShow: 2 },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: { slidesToShow: 1 },
    //   },
    // ],
  };

  return (
    <div className={styles['slider-wrapper']}>
      <Slider {...settings}>
        {price
          ? discountProducts.map(product => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  showOldPrice={price}
                  category={product.category as CategoryType}
                />
              </div>
            ))
          : newestProducts.map(product => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  showOldPrice={price}
                  category={product.category as CategoryType}
                />
              </div>
            ))}
      </Slider>
    </div>
  );
};
