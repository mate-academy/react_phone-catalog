import { Products } from './../../../types/Products';
import style from './SwiperProduct.module.scss';
import { useEffect, useState } from 'react';

import ArrowLeft from './../../../../public/icon/ArrowLeft white.svg';
import ArrowRight from './../../../../public/icon/ArrowRight white.svg';
import { ProductCard } from '../ProductCard';

interface Props {
  products: Products[];
  title: string;
}

export const SwiperProduct: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(3);

  const updateVisibleProducts = () => {
    const width = window.innerWidth;

    switch (true) {
      case width < 440:
        setVisibleProducts(1);
        break;
      case width < 640:
        setVisibleProducts(2);
        break;
      case width < 1200:
        setVisibleProducts(3);
        break;
      default:
        setVisibleProducts(4);
        break;
    }
  };

  useEffect(() => {
    updateVisibleProducts();
    window.addEventListener('resize', updateVisibleProducts);

    return () => {
      window.removeEventListener('resize', updateVisibleProducts);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className={style['product-swiper']}>
      <div className={style['product-swiper__header']}>
        <h2 className={style['product-swiper__title']}>{title}</h2>

        <div className={style['product-swiper__buttons']}>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`${style['product-swiper__btn']}
                        ${style['product-swiper__btn--prev']}`}
          >
            <img
              src={ArrowLeft}
              alt="PrevImage"
              className={style['product-swiper__icon']}
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === products.length - visibleProducts}
            className={`${style['product-swiper__btn']}
                        ${style['product-swiper__btn--next']}`}
          >
            <img
              src={ArrowRight}
              alt="NextImage"
              className={style['product-swiper__icon']}
            />
          </button>
        </div>
      </div>

      <div className={style['product-swiper__wrapper']}>
        <div className={style['product-swiper__list']}>
          {products.map(product => {
            return (
              <div
                key={product.id}
                className={style['product-swiper__item']}
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`,
                }}
              >
                <ProductCard products={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
