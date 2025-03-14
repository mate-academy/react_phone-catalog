import React, { useEffect, useRef } from 'react';
import style from './ProductsSlider.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
import { ProductItem } from '../../shared/ProductItem';
import { Product } from '../../shared/types/Product';

type Props = {
  title: string;
  productsToShow: Product[];
  discount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  productsToShow,
  discount,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const track = document.querySelector('.slick-track') as HTMLElement;
    const list = document.querySelector('.slick-list') as HTMLElement;

    if (track && list) {
      track.style.transform = 'translateX(-20px)';
      list.style.paddingLeft = '0';
      list.style.paddingRight = '10%';
      list.style.overflow = 'hidden';
    }
  }, []);

  const settings = {
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
    <div className={style.products}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
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

      <div className={style.slider}>
        <Slider {...settings}>
          {productsToShow.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              discount={discount}
              styles={{ width: '90%' }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
