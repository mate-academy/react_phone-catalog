/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from 'react';
import { Product } from '../shared/types/Product';
import style from './SuggestedProducts.module.scss';
import Slider from 'react-slick';
import { ProductItem } from '../shared/ProductItem';
import { t } from 'i18next';

export const SuggestedProducts = () => {
  const getSuggestedProducts = async (count: number) => {
    const response = await fetch('./api/products.json');
    const products = await response.json();

    return products.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const suggested = await getSuggestedProducts(12);

      setProducts(suggested);
    };

    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const track = document.querySelector('.slick-track') as HTMLElement;
  //   const list = document.querySelector('.slick-list') as HTMLElement;

  //   if (track && list) {
  //     track.style.transform = 'translateX(-20px)';
  //     list.style.paddingLeft = '0';
  //     list.style.paddingRight = '10%';
  //   }
  // }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    ref: sliderRef,
  };

  return (
    <div className={style.suggested}>
      <div className={style.header}>
        <h2 className={style.title}>{t('You may also like')}</h2>
        <div className={style.controls}>
          <button
            className={style.prev}
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <img src="icons/arrow-left.png" alt="Previous" />
          </button>
          <button
            className={style.next}
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img src="icons/arrow-right.png" alt="Next" />
          </button>
        </div>
      </div>
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className={style.slide}>
            <ProductItem
              product={product}
              discount={true}
              // styles={{ width: '95%' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
