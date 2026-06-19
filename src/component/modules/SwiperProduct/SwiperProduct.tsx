import { Products } from './../../../types/Products';
import style from './SwiperProduct.module.scss';
import { useEffect, useState } from 'react';

import { ProductCard } from '../ProductCard';

interface Props {
  products: Products[];
  title: string;
}

export const SwiperProduct: React.FC<Props> = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(4);

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    // Справжні брейкпоінти, що враховують фізичний розмір карток (272px + 16px gap):
    if (width >= 1200) {
      setVisibleCardsCount(4); // Десктоп: поміщається 4 картки (1136px)
    } else if (width >= 900) {
      setVisibleCardsCount(3); // Великий планшет/ноутбук: поміщається 3 картки (848px)
    } else if (width >= 640) {
      setVisibleCardsCount(2); // Планшет: поміщається точно 2 картки (560px)
    } else {
      setVisibleCardsCount(1); // Мобілка: 1 картка
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  // Обчислюємо максимальний індекс, далі якого гортати не можна
  const maxIndex = products.length - visibleCardsCount;

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex >= maxIndex ? prevIndex : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex <= 0 ? 0 : prevIndex - 1,
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
              src="icon/arrow-left.svg"
              className={style['swiper-product__btn-icon']}
              alt="PrevImage"
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex} // Кнопка блокується строго на фініші
            className={`
              ${style['swiper-product__btn']}
              ${style['swiper-product__btn--next']}
            `}
          >
            <img
              src="icon/arrow-right.svg"
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
