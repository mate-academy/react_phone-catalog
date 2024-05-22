import React from "react";
import './PhoneTablAccessCard.scss';
import { TabAccessPhone } from "../../types/tabAccessPhones";
import Favorites from '../../images/homePage/Favorites.svg';

type Props = {
  product: TabAccessPhone;
  brand?: boolean;
};

export const PhoneTablAccessCard: React.FC<Props> = ({ product, brand }) => {
  return (
    <div className="card" data-cy="cardsContainer">
      <div className="card__url">
        <img
          src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.images[0]}`}
          alt={product.category}
          className="card__img"
        />
      </div>
      <div className="card__details">
        <div className="card__header">
          <div className="card__name">{product.name}</div>
          <div className="card__price">
            {brand
              ? <div className="card__price__no-discount card__price__no-discount--brand">
                  ${product.priceRegular}
                </div>
              : <><div className="card__price__discount">${product.priceDiscount}</div>
                  <div className="card__price__no-discount card__price__no-discount--hot">
                    ${product.priceRegular}
                  </div>
                </>
            }
          </div>
        </div>
        <div className="card__line"></div>
        <div className="card__discription">
          <div className="card__center">
            <div className="card__screen-name">Screen</div>
            <div className="card__screen">{product.screen}</div>
          </div>
          <div className="card__center">
            <div className="card__capacity-name">Capacity</div>
            <div className="card__capacity">{product.capacity}</div>
          </div>
          <div className="card__center">
            <div className="card__ram-name">RAM</div>
            <div className="card__ram">{product.ram}</div>
          </div>
        </div>
        <div className="card__buttons">
          <button className="card__buttons__add">Add to cart</button>
          <button className="card__buttons__favorite">
            <img
              src={Favorites}
              alt="favorites"
              className="card__buttons__heart"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
