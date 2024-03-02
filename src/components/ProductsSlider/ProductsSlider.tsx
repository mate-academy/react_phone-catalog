import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Product } from '../../type/Product';
import { ProductCart } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[],
  title: string,
  hasDiscount?: boolean,
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  hasDiscount,
}) => {
  let num = 1;
  const windowWidth = window.innerWidth;

  if (windowWidth >= 1200) {
    num = 4;
  } else if (windowWidth >= 900) {
    num = 3;
  }

  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(num);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1200) {
        setSlidesToShow(4);
      } else if (screenWidth >= 900) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nexSlider = () => {
    if (slideIndex + slidesToShow <= products.length - 1) {
      setSlideIndex(slideIndex + slidesToShow);
    } else {
      setSlideIndex(products.length - 1);
    }
  };

  const prevSlider = () => {
    if (slideIndex >= slidesToShow) {
      setSlideIndex(slideIndex - slidesToShow);
    } else {
      setSlideIndex(0);
    }
  };

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        <h1 className="products-slider__title">
          {title}
        </h1>
        <div className="products-slider__navigation">
          <button
            aria-label="Go back"
            type="button"
            className="products-slider__button button-icon"
            onClick={prevSlider}
            disabled={slideIndex === 0}
          >
            <span className={cn('icon', {
              'icon--arrow-left-chevron': slideIndex === 0,
              'icon--arrow-left': slideIndex !== 0,
            })}
            />
          </button>
          <button
            aria-label="Go forward"
            type="button"
            className="products-slider__button button-icon"
            onClick={nexSlider}
            disabled={slideIndex + slidesToShow >= products.length - 1}
          >
            <span className={cn('icon', {
              'icon--arrow-right-chevron':
                slideIndex + slidesToShow >= products.length - 1,
              'icon--arrow-right':
                slideIndex < products.length - 1,
            })}
            />
          </button>
        </div>
      </div>

      <ul className="products-slider__list">
        {products.slice(slideIndex, slideIndex + slidesToShow).map(product => (
          <ProductCart
            key={product.id}
            product={product}
            hasDiscount={hasDiscount}
          />
        ))}
      </ul>
    </div>
  );
};
