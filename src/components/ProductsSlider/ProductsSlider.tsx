import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Product } from '../../helpers/types/Product';
import { ProductsCard } from '../ProductsCard';
import './ProductsSlider.scss';

type Props = {
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const [isFirstImage, setIsFirstImage] = useState(true);
  const [isLastImage, setIsLastImage] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const container = sliderRef.current;
  const scrollAmount = 1148;

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
          className={classNames('ProductsSlider__button', {
            'ProductsSlider__button--disabled': isFirstImage,
          })}
          onClick={moveLeft}
          disabled={isFirstImage}
        >
          <img
            src="/img/icons/vector_icon.svg"
            alt="Icon vector"
            className={classNames(
              'ProductsSlider__vector-icon ProductsSlider__vector-icon--left',
              {
                'ProductsSlider__vector-icon--disabled': isFirstImage,
              },
            )}
          />
        </button>

        <button
          type="button"
          className={classNames('ProductsSlider__button', {
            'ProductsSlider__button--disabled': isLastImage,
          })}
          onClick={moveRight}
          disabled={isLastImage}
        >
          <img
            src="/img/icons/vector_icon.svg"
            alt="Icon vector"
            className={classNames('ProductsSlider__vector-icon', {
              'ProductsSlider__vector-icon--disabled': isLastImage,
            })}
          />
        </button>
      </div>

      <div className="ProductsSlider__cards" ref={sliderRef}>
        {products.map(product => (
          <ProductsCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
