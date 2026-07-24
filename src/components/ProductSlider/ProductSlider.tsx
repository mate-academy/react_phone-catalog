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

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={style.card__slider}>
        <h2>{text}</h2>
        <div className={style.button__box}>
          <button
            className={style.button}
            disabled={currentCards === 0}
            onClick={() => setCurrentCards(currentCards - 1)}
          >
            <img src={arrow} alt="arrow_left" className={style.arrow__left} />
          </button>
          <button
            className={style.button}
            disabled={currentCards + 4 === products.length}
            onClick={() => setCurrentCards(currentCards + 1)}
          >
            <img src={arrow} alt="arrow_right" />
          </button>
        </div>
      </div>
      <div
        className={style.card__slider__product}
        style={{ transform: `translateX(-${currentCards * 288}px)` }}
      >
        {products.map(product => (
          <div key={product.id}>
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
