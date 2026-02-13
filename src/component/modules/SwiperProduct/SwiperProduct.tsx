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
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    switch (true) {
      case width < 440:
        setVisibleCardsCount(1);
        break;
      case width < 640:
        setVisibleCardsCount(2);
        break;
      case width < 1200:
        setVisibleCardsCount(3);
        break;
      default:
        setVisibleCardsCount(4);
        break;
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
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
    <section className={style['swiper-product']}>
      <div className={style['swiper-product__header']}>
        <h2 className={style['swiper-product__title']}>{title}</h2>

        <div className={style['swiper-product__button']}>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`
              ${style['swiper-product__btn']}
              ${style['swiper-product__btn--prev']}
            `}
          >
            <img
              src={ArrowLeft}
              className={style['swiper-product__btn-icon']}
              alt="PrevImage"
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === products.length - visibleCardsCount}
            className={`
              ${style['swiper-product__btn']}
              ${style['swiper-product__btn--next']}
            `}
          >
            <img
              src={ArrowRight}
              className={style['swiper-product__btn-icon']}
              alt="NextImage"
            />
          </button>
        </div>
      </div>

      <div className={style['swiper-product__wrapp']}>
        <div className={style['swiper-product__list']}>
          {products.map(product => {
            return (
              <div
                key={product.id}
                className={style['swiper-product__item']}
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
