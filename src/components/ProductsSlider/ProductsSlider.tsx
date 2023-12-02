/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [countProducts, setProducts] = useState(0);

  const productSlideRef = useRef<HTMLLIElement | null>(null);

  const updateSlide = (newOffsetX: number, newIndex: number) => {
    setOffsetX(newOffsetX);

    setIndex(newIndex);
  };

  const handlePrevBtn = () => {
    const newIndex = index - 1;

    updateSlide(-newIndex * (slideWidth + 16), newIndex);
  };

  const handleNextBtn = () => {
    const newIndex = index + 1;

    updateSlide(-newIndex * (slideWidth + 16), newIndex);
  };

  useEffect(() => {
    const updateSlideWidth = () => {
      if (productSlideRef.current) {
        setSlideWidth(productSlideRef.current.offsetWidth);
      }

      switch (true) {
        case window.innerWidth >= 1440:
          setProducts(4);
          break;

        case window.innerWidth >= 768:
          setProducts(3);
          break;

        case window.innerWidth >= 575:
          setProducts(2);
          break;

        default:
          setProducts(1);
      }

      updateSlide(0, 0);
    };

    updateSlideWidth();

    window.addEventListener('resize', updateSlideWidth);

    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, [products]);

  return (
    <section className="main__products-slider products-slider">
      <div className="container">
        <div className="products-slider__content">
          <div className="products-slider__top-bar">
            <h2 className="products-slider__title">
              {title}
            </h2>

            <div className="products-slider__control-panel">
              <button
                className={classNames(
                  'products-slider__btn',
                  'button',
                  { 'button--disable': index === 0 },
                )}
                onClick={handlePrevBtn}
                disabled={index === 0}
              >
                <div
                  className="
                    icon
                    icon__btn-prev"
                />
              </button>

              <button
                className={classNames(
                  'products-slider__btn',
                  'button',
                  {
                    'button--disable':
                      index === products.length - countProducts,
                  },
                )}
                onClick={handleNextBtn}
                disabled={index === products.length - countProducts}
              >
                <div
                  className="
                    icon
                    icon__btn-prev
                    icon__btn-prev--transform-scaleX"
                />
              </button>
            </div>
          </div>

          <div className="products-slider__slides">
            <ul
              className="products-slider__list"
              style={{
                transform: `translateX(${offsetX}px)`,
              }}
            >
              {
                products.map(product => (
                  <li
                    key={getUniqueId()}
                    className="products-slider__slide"
                    ref={productSlideRef}
                  >
                    <ProductCard product={product} />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
