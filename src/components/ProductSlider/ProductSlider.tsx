import { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import style from './ProductSlider.module.scss';
import arrow from '../../../public/icons/Arrow.svg';
import { ItemPreview } from '../../types/Product';
type Props = {
  products: ItemPreview[];
  text: string;
};
export const ProductSlider = ({ products, text }: Props) => {
  const [currentCards, setCurrentCards] = useState(0);

  const cardWidth = 288;
  const visibleCards = 4;
  const maxIndex = Math.max(0, products.length - visibleCards);

  return (
    <div className={style.slider}>
      <div className={style.card__slider}>
        <h2>{text}</h2>

        <div className={style.button__box}>
          <button
            type="button"
            className={style.button}
            disabled={currentCards === 0}
            onClick={() => setCurrentCards(current => Math.max(0, current - 1))}
          >
            <img
              src={arrow}
              alt="Previous products"
              className={style.arrow__left}
            />
          </button>

          <button
            type="button"
            className={style.button}
            disabled={currentCards >= maxIndex}
            onClick={() =>
              setCurrentCards(current => Math.min(maxIndex, current + 1))
            }
          >
            <img src={arrow} alt="Next products" />
          </button>
        </div>
      </div>

      <div className={style.slider__viewport}>
        <div
          className={style.card__slider__product}
          style={{
            transform: `translateX(-${currentCards * cardWidth}px)`,
          }}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              item={product}
              discount={text !== 'Brand new models'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
