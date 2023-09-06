/* eslint-disable jsx-a11y/control-has-associated-label */
import './ProductsSlider.scss';
import { useContext, useState } from 'react';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductSection } from '../../types/ProductSection';
import { CardWidthContext } from '../contexts/CardWidthContextProvider';

type Props = {
  title: ProductSection,
  products: Product[]
};

const gap = 16;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [position, setPosition] = useState(0);
  const visibleProducts = products.slice(0, 21);
  const { cardWidth } = useContext(CardWidthContext);

  const maxPosition = -(visibleProducts.length * (cardWidth + gap)
    - 4 * (cardWidth + gap));

  const clickNext = () => {
    const newPosition = position - (cardWidth + gap);

    setPosition(Math.max(newPosition, maxPosition));
  };

  const clickPrev = () => {
    const newPosition = position + (cardWidth + gap);

    setPosition(Math.min(newPosition, 0));
  };

  return (
    <div className="slider">
      <div className="slider__header">

        <h1 className="slider__title">
          {title}
        </h1>

        <div className="slider__buttons">
          <button
            type="button"
            className={classNames(
              'slider__button',
              position === 0
                ? 'slider__btn-left--disabled'
                : 'slider__btn-left',
            )}
            onClick={clickPrev}
            disabled={position === 0}
          />

          <button
            disabled={position === maxPosition}
            className={classNames(
              'slider__button',
              position === maxPosition
                ? 'slider__btn-right--disabled'
                : 'slider__btn-right',
            )}
            type="button"
            onClick={clickNext}
          />

        </div>
      </div>

      <ul
        className="slider__list"
        style={{
          transform: `translateX(${position}px)`,
          transition: 'transform 0.5s',
          width: cardWidth * visibleProducts.length,
        }}
      >
        {visibleProducts.map(product => {
          return (
            <li
              className="slider__item"
              key={product.id}
            >
              <ProductCard
                title={title}
                product={product}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
