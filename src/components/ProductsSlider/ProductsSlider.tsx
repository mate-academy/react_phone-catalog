/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import './ProductsSlider.scss';
import { Product } from '../../helpers/types/Product';
import { useScreenSize } from '../../helpers/hooks/useScreenSize';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[],
};

const cellWidth = 284;

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const [position, setPosition] = useState(0);
  const [isFirstCard, setIsFirstCard] = useState(true);
  const [isLastCard, setIsLastCard] = useState(false);
  const [frameSize, setFrameSize] = useState(4);
  const screenSize = useScreenSize();

  const amount = useMemo(() => products.length, [products]);

  useEffect(() => {
    if (screenSize.width < 600) {
      setFrameSize(1);
    } else if (screenSize.width < 900) {
      setFrameSize(2);
    } else if (screenSize.width < 1176) {
      setFrameSize(3);
    } else {
      setFrameSize(4);
    }
  }, [screenSize.width]);

  const handlePrevClick = () => {
    setPosition((currentPosition) => {
      setIsLastCard(false);

      const firstIndex = -currentPosition / cellWidth;

      if (firstIndex - frameSize <= 0) {
        setIsFirstCard(true);

        return currentPosition + cellWidth * firstIndex;
      }

      return currentPosition + cellWidth * frameSize;
    });
  };

  const handleNextClick = () => {
    setPosition((currentPosition) => {
      setIsFirstCard(false);

      const lastIndex = -currentPosition / cellWidth + frameSize - 1;

      if (lastIndex + frameSize >= amount - 1) {
        setIsLastCard(true);

        return currentPosition - cellWidth * (amount - 1 - lastIndex);
      }

      return currentPosition - cellWidth * frameSize;
    });
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__buttons">
        <button
          type="button"
          className={classNames(
            'ProductsSlider__button ProductsSlider__button--prev', {
              'ProductsSlider__button--disabled': isFirstCard,
            },
          )}
          onClick={handlePrevClick}
          disabled={isFirstCard}
        />

        <button
          type="button"
          className={classNames('ProductsSlider__button', {
            'ProductsSlider__button--disabled': isLastCard,
          })}
          onClick={handleNextClick}
          disabled={isLastCard}
        />
      </div>

      <div
        className="ProductsSlider__wrapper"
        style={{
          width: `${cellWidth * frameSize}px`,
        }}
      >
        <ul
          className="ProductsSlider__list"
          style={{
            width: `${cellWidth * amount}px`,
          }}
        >
          {products.map(product => (
            <li
              key={product.id}
              className="ProductsSlider__item"
              style={{
                width: `${cellWidth - 16}px`,
                transform: `translateX(${position}px)`,
              }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
