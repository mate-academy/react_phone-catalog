import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { Skeleton } from '../Skeleton';
import arrowLeft from '../../images/logo/arrowLeft.svg';
import sliderArrow from '../../images/logo/sliderArrow.svg';

type Props = {
  products: Product[];
  title: string;
  isLoading?: boolean;
};

export const Slider: React.FC<Props> = ({ products, title, isLoading }) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const firstItemIndex = 0;
  const lastItemIndex = products.length - 1;

  const [itemWidth, setItemWidth] = useState(0);
  const [itemIndex, setItemIndex] = useState(firstItemIndex);

  const ITEMS_GAP = 16;

  const transformXValue = itemIndex * (itemWidth + ITEMS_GAP);

  const handleNextClick = () => {
    if (itemIndex !== lastItemIndex) {
      setItemIndex(itemIndex + 1);
    } else {
      setItemIndex(firstItemIndex);
    }
  };

  const handlePrevClick = () => {
    if (itemIndex !== firstItemIndex) {
      setItemIndex(itemIndex - 1);
    } else {
      setItemIndex(lastItemIndex);
    }
  };

  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }
  }, [itemIndex]);

  return (
    <section className="slider">
      <div className="slider__content">
        <div className="slider__top">
          <h2 className="slider__title">{title}</h2>
          <div className="slider__buttons">
            <div
              className={classNames('slider__button slider__button--prev', {
                'slider__button--disabled': itemIndex === firstItemIndex,
              })}
              onClick={handlePrevClick}
            >
              <img
                src={itemIndex === firstItemIndex ? arrowLeft : sliderArrow}
                alt="Previous"
              />
            </div>
            <div
              className={classNames('slider__button slider__button--next', {
                'slider__button--disabled': itemIndex === lastItemIndex - 3,
              })}
              onClick={handleNextClick}
            >
              <img
                src={itemIndex === lastItemIndex - 3 ? arrowLeft : sliderArrow}
                alt="Next"
              />
            </div>
          </div>
        </div>
        <div className="slider__items">
          <ul className="slider__items__list">
            {products.map(product => (
              <li
                className="slider__items__list-item"
                key={product.id}
                ref={itemRef}
                style={{
                  transform: `translateX(-${transformXValue}px)`,
                  paddingBlock: isLoading ? '0px' : '32px',
                }}
              >
                {isLoading ? (
                  <Skeleton products={products} />
                ) : (
                  <ProductCard product={product} discount={product.fullPrice} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
