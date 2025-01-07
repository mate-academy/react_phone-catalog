import React from 'react';
import './PhoneTablAccessCard.scss';
import { useAppSelector } from '../../app/hooks';
import { Button } from '../Button/Button';
import { Product } from '../../types/product';

type Props = {
  product: Product;
  brand?: boolean;
};

export const PhoneTablAccessCard: React.FC<Props> = ({ product, brand }) => {
  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const cardClass = `card theme-${theme}`;
  const cardName = `card__name theme-${theme}`;
  const cardPrice = `card__price theme-${theme}`;
  const cardPriceNoDoscount = `card__price__no-discount theme-${theme}`;
  const cardLine = `card__line theme-${theme}`;
  const cardProps = `card__props theme-${theme}`;
  const cardValues = `card__values theme-${theme}`;

  return (
    <div className={cardClass} data-cy="cardsContainer">
      <div className="card__url">
        <img
          src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.image}`}
          alt={product.category}
          className="card__img"
        />
      </div>
      <div className="card__details">
        <div className="card__header">
          <div className={cardName}>{product.name}</div>
          <div className="card__price">
            {brand ? (
              <div
                className={`${cardPrice} card__price__no-discount 
                card__price__no-discount--brand`}
              >
                ${product.fullPrice}
              </div>
            ) : (
              <>
                <div className={`${cardPrice} card__price__discount`}>
                  ${product.price}
                </div>
                <div
                  className={`card__price__no-discount--hot
                  ${cardPriceNoDoscount}`}
                >
                  ${product.fullPrice}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={cardLine}></div>
        <div className="card__discription">
          <div className="card__center">
            <div className={`${cardProps} card__screen-name`}>Screen</div>
            <div className={`${cardValues} card__screen`}>{product.screen}</div>
          </div>
          <div className="card__center">
            <div className={`${cardProps} card__capacity-name`}>Capacity</div>
            <div className={`${cardValues} card__capacity`}>
              {product.capacity}
            </div>
          </div>
          <div className="card__center">
            <div className={`${cardProps} card__ram-name`}>RAM</div>
            <div className={`${cardValues} card__ram`}>{product.ram}</div>
          </div>
        </div>
        <Button productId={product.id} />
      </div>
    </div>
  );
};
