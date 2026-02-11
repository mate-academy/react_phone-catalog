import React from 'react';
import style from './ProductBuySection.module.scss';
import { ProductDetails } from '../../../../types/Product';
import { useLikeProducts } from '../../../../context/LikeCard';
import { useCard } from '../../../../context/CardContext';

type Props = {
  data: ProductDetails;
};

export const ProductBuySection: React.FC<Props> = ({ data }) => {
  const { but, has } = useLikeProducts();
  const { add, item } = useCard();

  const productAdded = item.some(ind => ind.id === data.id);
  const likePlus = has(data.id);

  return (
    <div>
      <div className={style.price}>
        <p className={style.currentPrice}>${data.priceDiscount}</p>

        {data.priceRegular !== data.priceDiscount && (
          <p className={style.oldPrice}>${data.priceRegular}</p>
        )}
      </div>

      <div className={style.button}>
        <button
          className={`${style.leftBut} ${productAdded ? style.leftButActive : ''}`}
          onClick={() => !productAdded && add(data)}
          disabled={productAdded}
        >
          {productAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          aria-label="like product"
          className={`${style.rightBut} ${likePlus ? style.rightButActive : ''}`}
          onClick={() => but(data.id)}
        >
          {likePlus ? (
            <img src="img/buttons/hover_heart_button.svg" alt="liked" />
          ) : (
            <img src="img/buttons/empty_heart_button.svg" alt="not liked" />
          )}
        </button>
      </div>

      <div className={style.part}>
        <p className={style.paragraph}>
          Screen <span className={style.span}>{data.screen}</span>
        </p>
        <p className={style.paragraph}>
          Capacity <span className={style.span}>{data.capacity}</span>
        </p>
        <p className={style.paragraph}>
          RAM <span className={style.span}>{data.ram}</span>
        </p>
      </div>
    </div>
  );
};
