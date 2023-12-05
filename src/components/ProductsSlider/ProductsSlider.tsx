/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Product } from '../../helpers/types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[],
};

const scrollAmount = 1148;

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const [isFirstImage, setIsFirstImage] = useState(true);
  const [isLastImage, setIsLastImage] = useState(false);

  const sliderRef = useRef<HTMLUListElement>(null);
  const container = sliderRef.current;

  useEffect(() => {
    if (container) {
      container.scrollLeft = 0;
    }
  }, []);

  const moveLeft = () => {
    setIsLastImage(false);

    if (container) {
      container.scrollLeft -= scrollAmount;

      if (container.scrollLeft - scrollAmount <= 0) {
        setIsFirstImage(true);
      }
    }
  };

  const moveRight = () => {
    setIsFirstImage(false);

    if (container) {
      container.scrollLeft += scrollAmount;

      const containerLength = (products.length / 4) * scrollAmount;

      if (container.scrollLeft + 3 * scrollAmount > containerLength) {
        setIsLastImage(true);
      }
    }
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__buttons">
        <button
          type="button"
          className={classNames(
            'ProductsSlider__button ProductsSlider__button--left', {
              'ProductsSlider__button--disabled': isFirstImage,
            },
          )}
          onClick={moveLeft}
          disabled={isFirstImage}
        />

        <button
          type="button"
          className={classNames('ProductsSlider__button', {
            'ProductsSlider__button--disabled': isLastImage,
          })}
          onClick={moveRight}
          disabled={isLastImage}
        />
      </div>

      <ul className="ProductsSlider__cards" ref={sliderRef}>
        {products.map(product => (
          <li key={product.id} className="ProductsSlider__item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
