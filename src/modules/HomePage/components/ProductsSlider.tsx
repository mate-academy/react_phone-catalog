import React, { useState, useEffect } from 'react';
import style from './ProductsSlider.module.scss';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      setSlidesToShow(1);
    } else if (width <= 1100) {
      setSlidesToShow(2);
    } else if (width <= 1300) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(4);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);

    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentSlide(0);
    } else if (index >= productsToShow.length - slidesToShow) {
      setCurrentSlide(productsToShow.length - slidesToShow);
    } else {
      setCurrentSlide(index);
    }
  };

  const offset = currentSlide * (100 / slidesToShow);

  return (
    <div className={style.products}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.controls}>
          <button
            className={style.prev}
            onClick={() => goToSlide(currentSlide - 1)}
          >
            <img src="icons/arrow-left.png" alt="Previous" />
          </button>
          <button
            className={style.next}
            onClick={() => goToSlide(currentSlide + 1)}
          >
            <img src="icons/arrow-right.png" alt="Next" />
          </button>
        </div>
      </div>

      <div className={style.slider}>
        <div
          className={style.slickTrack}
          style={{
            transform: `translateX(-${offset}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {productsToShow
            .slice(currentSlide, currentSlide + slidesToShow)
            .map(product => (
              <div key={product.id} className={style.slickSlide}>
                <ProductItem product={product} discount={discount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
