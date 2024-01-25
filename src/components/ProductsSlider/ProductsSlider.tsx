import { useState } from 'react';
import classNames from 'classnames';
import './ProductsSlider.scss';
import { Product } from '../../helpers/Product';
import { ProductCard } from '../ProductCard/ProductCard';

const cardWidth = 272;
const gap = 16;

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [position, setPosition] = useState(0);
  const visibleProducts = products.slice(0, 21);
  const maxPosition = -((visibleProducts.length - 4) * (cardWidth + gap));

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
          >
            {'<'}
          </button>

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
          >
            {'>'}
          </button>
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
                product={product}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
