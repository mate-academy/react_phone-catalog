import React, { useEffect, useRef, useState } from 'react';
import './ProductsSlider.scss';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
}) => {
  const [imageNo, setImageNo] = useState<number>(0);
  const slider = useRef<HTMLDivElement>(null);
  const cardWidth = 272;
  const gap = 16;

  useEffect(() => {
    if (slider.current) {
      slider.current.style.translate = `${(-imageNo * (cardWidth + gap))}px`;
    }
  }, [imageNo]);

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">
          {title}
        </h2>

        <div className="products-slider__buttons">
          <button
            className={classNames(
              'button',
              'button--left',
              {
                'button--left_disabled': imageNo === 0,
                'button--disabled': imageNo === 0,
              },
            )}
            aria-label="leftBtn"
            type="button"
            onClick={() => {
              setImageNo(prev => prev - 1);
            }}
            disabled={
              imageNo === 0
            }
          />
          <button
            className={classNames(
              'button',
              'button--right',
              {
                'button--right_disabled': imageNo === products.length - 4,
                'button--disabled': imageNo === products.length - 4,
              },
            )}
            aria-label="rightBtn"
            type="button"
            onClick={() => {
              setImageNo(prev => prev + 1);
            }}
            disabled={
              imageNo === products.length - 4
            }
          />
        </div>
      </div>
      <div
        data-cy="cardsContainer"
        className="products-slider__slider"
        ref={slider}
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
